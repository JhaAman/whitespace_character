from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    def handle(self, *args, **options):
        if User.objects.count() == 0:
            username = 'root'
            email = ''
            password = 'pwd'
            print('Creating account for %s (%s)' % (username, email))
            admin = User.objects.create_superuser(email=email, username=username, password=password)
            admin.is_superuser = True
            admin.is_active = True
            admin.is_staff = True
            admin.save()
        else:
            print('Admin accounts can only be initialized if no Accounts exist')