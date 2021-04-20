from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from api.db.models import Team
from api.db.serializers import TeamSerializer
from api.db.models import User
from api.db.serializers import UserSerializer
from api.db.models import Company
from api.db.serializers import CompanySerializer
from base64 import b64decode
import json

@api_view(["POST"])
def create(request):
    try:
        companyValueData = json.loads(b64decode(request.data[0]['uploaded_file'].replace('data:application/json;base64,', '')))
        employeeData = json.loads(b64decode(request.data[1]['uploaded_file'].replace('data:application/json;base64,', '')))

        # Create company
        companySerializer = CompanySerializer(data={"name": companyValueData['companyName'], "values": companyValueData['values'], "badges": []})
        if companySerializer.is_valid():
            companySerializer.save()
        else:
            return Response("companySerializer.errors", status.HTTP_422_UNPROCESSABLE_ENTITY)
        companyName = companyValueData['companyName']
        companyID = Company.objects.get(name=companyValueData['companyName']).cid

        # Create teams
        for user in employeeData:
            userData = {
                'first_name': user['firstName'],
                'last_name': user['lastName'],
                'email': user['email'],
                'password': user['password'],
                'title': user['positionTitle']
            }
            check = False;
            if user['isManager']:
                userData['user_role'] = "mng"
                check = True;

            # Creates the initial team with the CEO
            if user['positionTitle'] == 'CEO':
                teamSerializer = TeamSerializer(data={'cid': companyID, 'name': '{compName} 1'.format(compName=companyName)})
                if teamSerializer.is_valid():
                    teamSerializer.save()
                else:
                    return Response(teamSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
                userData['tid'] = Team.objects.get(name='{compName} 1'.format(compName=companyName)).tid
                userSerializer = UserSerializer(data=userData)
                if userSerializer.is_valid():
                    userSerializer.save()
                else:
                    return Response(userSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
                continue
            # If the team exists, add the user to that team
            if Team.objects.filter(name='{compName} {mngId}'.format(compName=companyName, mngId=str(user['managerId']))).exists():
                userData['tid'] = Team.objects.get(name='{compName} {mngId}'.format(compName=companyName, mngId=str(user['managerId']))).tid
                userSerializer = UserSerializer(data=userData)
                if userSerializer.is_valid():
                    userSerializer.save()
                else:
                    return Response(userSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
            # If the team does not exist, create the team and add the user        
            else:
                teamSerializer = TeamSerializer(data={'cid': companyID, 'name': '{compName} {mngId}'.format(compName=companyName, mngId=str(user['managerId']))})
                if teamSerializer.is_valid():
                    teamSerializer.save()
                else:
                    return Response(teamSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
                userData['tid'] = Team.objects.get(name='{compName} {mngId}'.format(compName=companyName, mngId=str(user['managerId']))).tid
                userSerializer = UserSerializer(data=userData)
                if userSerializer.is_valid():
                    userSerializer.save()
                else:
                    return Response(userSerializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(None, status.HTTP_201_CREATED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)