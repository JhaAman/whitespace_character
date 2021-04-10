from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
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
        companyData = {
            "name": companyValueData['companyName'],
            "values": companyValueData['values']
        }
        companySerializer = CompanySerializer(data=companyData)
        if companySerializer.is_valid(raise_exception=True):
            companySerializer.save()
        else:
            return Response(companySerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Create teams
        companyID = Company.objects.get(name=companyData['name']).cid
        for user in employeeData:
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
                userData = {
                    'first_name': user['firstName'],
                    'last_name': user['lastName'],
                    'email': user['email'],
                    'password': user['password'],
                    'tid': Team.objects.get(name=str(user['managerId'])).tid,
                    'job_title': user['positionTitle']
                }
                if user['isManager']:
                    userData['user_role'] = "mng"
                userSerializer = UserSerializer(data=userData)
                if userSerializer.is_valid(raise_exception=True):
                    userSerializer.save()
                else:
                    return Response(userSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
            # If the team does not exist, create the team and add the user        
            else:
                teamSerializer = TeamSerializer(data={'cid': companyID, 'name': str(user['managerId'])})
                if teamSerializer.is_valid(raise_exception=True):
                    teamSerializer.save()
                else:
                    return Response(teamSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
                userData = {
                    'first_name': user['firstName'],
                    'last_name': user['lastName'],
                    'email': user['email'],
                    'password': user['password'],
                    'tid': Team.objects.get(name=str(user['managerId'])).tid,
                    'job_title': user['positionTitle']
                }
                if user['isManager']:
                    userData['user_role'] = "mng"
                userSerializer = UserSerializer(data=userData)
                if userSerializer.is_valid(raise_exception=True):
                    userSerializer.save()
                else:
                    return Response(userSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)