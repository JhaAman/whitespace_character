from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.hashers import make_password
from api.models.User import *
from api.models.Team import *
from api.models.Company import *
from base64 import b64decode
import json

@api_view(["POST"])
def upload_data(request):
    try:
        companyValueData = json.loads(b64decode(request.data[0]['uploaded_file'].replace('data:application/json;base64,', '')))
        employeeData = json.loads(b64decode(request.data[1]['uploaded_file'].replace('data:application/json;base64,', '')))

        # Create company
        companySerializer = CompanySerializer(data={"name": companyValueData['companyName'], "values": companyValueData['values']})
        if companySerializer.is_valid(raise_exception=True):
            companySerializer.save()
        else:
            return Response(companySerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Create teams
        companyID = Company.objects.get(name=companyValueData['companyName']).cid
        for user in employeeData:
            userData = {
                'first_name': user['firstName'],
                'last_name': user['lastName'],
                'email': user['email'],
                'password': user['password'],
                'job_title': user['positionTitle']
            }
            check = False;
            if user['isManager']:
                userData['user_role'] = "mng"
                check = True;
            # Creates the initial team
            if user['positionTitle'] == 'CEO':
                teamSerializer = TeamSerializer(data={'cid': companyID, 'name': '1'})
                if teamSerializer.is_valid(raise_exception=True):
                    teamSerializer.save()
                    continue
                else:
                    return Response(teamSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
            # If the team exists, add the user to that team
            if Team.objects.filter(name=str(user['managerId'])).exists():
                userData['tid'] = Team.objects.get(name=str(user['managerId'])).tid
                userSerializer = UserSerializer(data=userData)
                if userSerializer.is_valid(raise_exception=True):
                    userSerializer.save()
                    AuthUser.objects.create(id = userSerializer['uid'].value, first_name = userData['first_name'], last_name = userData['last_name'], is_staff = check, username = userData['email'], password = make_password(userData['password']), email = userData['email'])
                else:
                    return Response(userSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
            # If the team does not exist, create the team and add the user        
            else:
                teamSerializer = TeamSerializer(data={'cid': companyID, 'name': str(user['managerId'])})
                if teamSerializer.is_valid(raise_exception=True):
                    teamSerializer.save()
                else:
                    return Response(teamSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
                userData['tid'] = Team.objects.get(name=str(user['managerId'])).tid
                userSerializer = UserSerializer(data=userData)
                if userSerializer.is_valid(raise_exception=True):
                    userSerializer.save()
                    AuthUser.objects.create(id = userSerializer['uid'].value, first_name = userData['first_name'], last_name = userData['last_name'], is_staff = check, username = userData['email'], password = make_password(userData['password']), email = userData['email'])
                else:
                    return Response(userSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)