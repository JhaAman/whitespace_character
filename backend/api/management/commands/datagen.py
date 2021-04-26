""" Mock Data Generator

Org: Team Whitespace Character
Authors: Khai Nguyen, khainguyen@umass.edu
Created: April 22, 2021

Generate random sample data in database

Detailed data schema can be found at:
    https://dbdiagram.io/d/60516c4becb54e10c33bc840
"""

import io
from io import BytesIO
import os
import time
import random

import py_avataaars
from PIL import Image
from django.utils.cache import \
    add_never_cache_headers, \
    patch_cache_control
from django.contrib.auth.models import User as AuthUser
from django.core.management.base import BaseCommand
from faker import Faker
from faker.providers import BaseProvider

from api.db.models import \
    Company, \
    Team, \
    User, \
    Recognition as Recog
from api.db.serializers import \
    CompanySerializer as CompSrl

from .printlog import Print


# Flag for Debug mode
# On debug, print out generated data to console
# On excecution, create data in database
DEBUG = 1
# Location sensitivity for data
# A Faker configuration to create data for specific regions
LOCALE = ["en_US"]
# Number of Company objects to be created
NUM_COMPANY_OBJ = 1
# Number of Company values
NUM_COMPANY_VALUES = 5
# Number of Company badges
NUM_COMPANY_BADGES = 5
# Number of Team objects to be created in each Company
NUM_TEAM_OBJ = 3
# Number of User objects to be created in each Team
NUM_USER_OBJ = 20
# Number of Recog objects to be created among Users
NUM_RECOG_OBJ = 350
# Number of avatars to be created
NUM_AVT_GEN = 100
# Number of flags to be randomly distributed among Recog objects
FLAG_PILE = 30
# Image CDN path
IMG_CDN_PATH = './media/stock/'

# Set of Company values
COMPANY_VALUES = [
    "Integrity",
    "Boldness",
    "Honesty", 
    "Responsible",
    "Passion",
    "Class Clown",
    "Humility", 
    "Leadership", 
    "Innovation",
    "Teamwork",
    "Succint",
    "Cutest Pet",
    "Best smile", 
]

# Set of Company badges
COMPANY_BADGES = [
    "Red Badge",
    "Green Badge",
    "Yellow Badge",
    "Cyan Badge",
    "Orange Badge",
    "Purple Badge",
    "Blue Badge",
    "Gray Badge",
    "Black Badge",
    "Magenta Badge",
    "Brown Badge",
    "Azure Badge",
    "Teal Badge",
    "Crimson Badge",
    "Pink Badge",
    "Silver Badge",
    "Gold Badge",
    "Bronze Badge",
    "Strongest Avenger"
]

# Set of Team names
TEAM_NAMES = [
    "Octopus Team",
    "Cod Team",
    "Salmon Team",
    "Seabass Team",
    "Shark Team",
    "Whale Team",
    "Tuna Team",
    "Catfish Team",
    "Carp Team",
    "Trout Team",
    "Eel Team",
    "Bluefin Team",
    "Beluga Team",
    "Dolphin Team",
    "Stingray Team",
    "Marlin Team",
    "Swordfish Team",
    "Flounder Team",
    "Snapper Team",
    "Crab Team",
    "SpongeBob Team",
    "Patrick Team",
    "Plankton Team",
    "Sandy Team",
    "MrKrabs Team",
    "Gary Team",
    "Squidward Team"
]


class Provider(BaseProvider):
    """Custom Faker providers

    Contains the following providers:
        company_values(): Get random Company value from predefined list
        company_badges(): Get random Company badge from predefined list
        team_name(): Get random Team name from predefined list
    """

    def company_values(self):
        return self.random_element(COMPANY_VALUES)
    def company_badges(self):
        return self.random_element(COMPANY_BADGES)
    def team_name(self):
        return self.random_element(TEAM_NAMES)


# Create a Faker instance and register custom providers
fake = Faker(LOCALE)
fake.add_provider(Provider)


def company_name():
    Faker.seed(time.time())
    return fake.unique.company()


def company_values():
    Faker.seed(time.time())
    vals = list()
    for _ in range(NUM_COMPANY_VALUES):
        vals.append(fake.unique.company_values())
    return vals


def company_badges():
    Faker.seed(time.time())
    vals = list()
    for _ in range(NUM_COMPANY_VALUES):
        vals.append(fake.unique.company_badges())
    return vals


def team_name():
    Faker.seed(time.time())
    return fake.unique.team_name()


# Reference from source: 
#   https://www.peterbe.com/plog/random-avatars-in-django-python
def generate_avatar_images():

    def r(enum_):
        return random.choice(list(enum_))

    printer = Print()

    for _ in range(NUM_AVT_GEN):
        # Random attributes for avatar
        avatar = py_avataaars.PyAvataaar(
            style=py_avataaars.AvatarStyle.CIRCLE,
            skin_color=r(py_avataaars.SkinColor),
            hair_color=r(py_avataaars.HairColor),
            facial_hair_type=r(py_avataaars.FacialHairType),
            facial_hair_color=r(py_avataaars.Color),
            top_type=r(py_avataaars.TopType),
            hat_color=r(py_avataaars.Color),
            mouth_type=r(py_avataaars.MouthType),
            eye_type=r(py_avataaars.EyesType),
            eyebrow_type=r(py_avataaars.EyebrowType),
            nose_type=r(py_avataaars.NoseType),
            accessories_type=r(py_avataaars.AccessoriesType),
            clothe_type=r(py_avataaars.ClotheType),
            clothe_color=r(py_avataaars.Color),
            clothe_graphic_type=r(py_avataaars.ClotheGraphicType),
        )
        # Relative path to image CDN
        imgName = \
            'avt' \
            + str(fake.unique.random_int(min=1000000, max=9999999)) \
            + '.png'
        imgPathTo = IMG_CDN_PATH + imgName
        
        # Convert from default SVG to PNG
        avatar.render_png_file(imgPathTo)
        # Save image to CDN
        image = Image.open(imgPathTo)
        image.save(imgPathTo)
        
        if DEBUG:
            printer.highlight(imgName + " created")


def CompanyFactory():
    return \
        {
            "name": company_name(),
            "values": company_values(),
            "badges": company_badges()
        }


def TeamFactory(compObj):
    return \
        {
            "cid": compObj.cid,
            "name": team_name(),
            "values_scores": dict().fromkeys(compObj.values, 0),
            "badges": []
        }


def UserFactory(teamDict):

    Faker.seed(time.time())

    firstName = fake.first_name()
    lastName = fake.last_name()
    email = firstName + lastName + "@" + fake.free_email_domain()

    return \
        {
            "tid": teamDict.tid,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": fake.word(),
            "user_role": "emp",
            "title": fake.job(),
        }


def RecogFactory(userFromObj, userToObj):

    Faker.seed(time.time())

    tagList = userFromObj.values_scores.keys()

    return \
        {
            "uid_from": userFromObj.uid,
            "uid_to": userToObj.uid,
            "comments": fake.sentence(nb_words=6, variable_nb_words=True),
            "tags": fake.random_elements(elements=tagList, unique=True)
        }


class Command(BaseCommand):
    def handle(self, *args, **kwargs):

        printer = Print()

        # Flushing database
        print()
        printer.header("Flushing database...")
        try:
            models = [Company, Team, User, Recog]
            for model in models:
                model.objects.all().delete()
                if DEBUG:
                    printer.msg("Clearing " + model.__name__ + "...")
            AuthUser.objects.exclude(is_superuser=True).delete()
            if DEBUG:
                printer.msg("Clearing Authentication credentials...")
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")

        # # Creating super user 
        # printer.header("Creating super user...")
        # try:
        #     os.system('echo \"from django.contrib.auth.models import User; User.objects.create_superuser(\'root\', \'khainguyen@umass.edu\', \'pwd\')\" | python manage.py shell')
        # except Exception as e:
        #     printer.fail("Failed")
        #     printer.fail(e)
        #     return
        # printer.success("Success!")

        # Create Company objects
        print()
        printer.header("Creating Company objects...")
        try:
            compObjList = list()
            for _ in range(NUM_COMPANY_OBJ):
                compDict = CompanyFactory()
                compObjList.append(Company.objects.create(**compDict))
                if (DEBUG):
                    printer.highlight(compDict)
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")

        # Creating Team objects
        print()
        printer.header("Creating Team objects...")
        try:
            teamObjList = list()
            counter = 1
            for compDict in compObjList:
                for _ in range(NUM_TEAM_OBJ):
                    teamDict = TeamFactory(compDict)
                    teamObjList.append(Team.objects.create(**teamDict))
                    if (DEBUG):
                        printer.msg(counter)
                        counter += 1
                        printer.highlight(teamDict)
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")

        # Generate random avatar images
        print()
        printer.header("Generating stock User avatar images...")
        try:
            if not os.path.exists(IMG_CDN_PATH):
                printer.msg("Image folder does not exist. Creating...")
                os.makedirs(IMG_CDN_PATH)

            if len(os.listdir(IMG_CDN_PATH)) == 0:
                generate_avatar_images()
            else:
                printer.msg("Stock avatar images already exist. Skipping...")
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")

        # Creating User objects
        print()
        printer.header("Creating User objects...")
        try:
            userObjList = list()
            counter = 1
            for teamObj in teamObjList:
                for _ in range(NUM_USER_OBJ):
                    userDict = UserFactory(teamObj)
                    if (DEBUG):
                        printer.msg(counter)
                        counter += 1
                        printer.highlight(userDict)
                    userObjList.append(User.objects.create(**userDict))
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")

        # For each Team, select at random a User to be manager
        print()
        printer.header("Assiging manager role to a User on each Teams...")
        try:
            for teamObj in teamObjList:
                userObj = \
                    fake.random_element(
                        elements=User.objects.filter(tid=teamObj.tid))
                userObj.user_role = "mng"
                userObj.save()
                if DEBUG:
                    printer.highlight("Team " + teamObj.tid + " is assigned manager " + userObj.uid)
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")

        # Creating Recognition objects
        print()
        printer.header("Creating Recognition objects...")
        try:
            recogObjList = list()
            counter = 1
            for _ in range(NUM_RECOG_OBJ):
                ab = [userObj 
                        for userObj in 
                            fake.random_elements(
                                elements=userObjList, 
                                length=2, 
                                unique=True)]
                recogDict = RecogFactory(ab[0], ab[1])
                recogObjList.append(Recog.objects.create(**recogDict))
                if DEBUG:
                    printer.msg(counter)
                    counter += 1
                    printer.highlight(recogDict)
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")

        # Randomly distribute 'FLAG_PILE' among Recognition objects
        print()
        printer.header("Distributing flags among Recognition objects...")
        flagPile = 0
        counter = 1
        try:
            while flagPile < FLAG_PILE:
                Faker.seed(time.time())
                recogObj = fake.random_element(elements=recogObjList)
                delta = fake.random_int(1, FLAG_PILE-flagPile)
                flagPile += delta
                recogObj.flag_count += delta
                recogObj.save()
                if DEBUG:
                    printer.msg(counter)
                    counter += 1
                    printer.highlight("Recognition " + recogObj.rid + " is flagged " + str(delta) + " times")
        except Exception as e:
            printer.fail("Failed")
            printer.fail(e)
            return
        printer.success("Success!")