"""Search Endpoints

Org: Team Whitespace Character
<<<<<<< HEAD
Authors: Khai Nguyen, khainguyen@umass.edu
=======
Authors: 
    Khai Nguyen, khainguyen@umass.edu
    Myron Lacey, 
    Duy Pham,
    Khang Nguyen, 
>>>>>>> main
Created: April 17th, 2021

API endpoints for search support
"""

from django.db.models import Q

from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status

from api.db.models import User
from api.db.serializers import \
    UserSerializer as UserSrl, \
    SearchUserSerializer as SearchUserSrl, \
    SearchUserPostSerializer as SearchUserPostSrl, \
    ApiResponseSerializer as ApiRespSrl


@api_view(["POST"])
def search_user(request):
    try:
        # Serialize incoming request data
        requestSrl =  SearchUserSrl(data=request.data)

        # If data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data=
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot return search result: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Get validated data
        searchDict = requestSrl.validated_data

        # Parse search query by space character
        parsedName = searchDict['query'].split(" ")
        firstNameQ = parsedName[0]
        lastNameQ = parsedName[1] if len(parsedName) > 1 else "*"

        # Query for matching user
        # Support case ignore search
        # For now can only search for name
        # Does not support best match search, so don't mistype
        searchUserPostQsList = \
            User.objects\
                .filter(
                    Q(first_name__icontains=firstNameQ)
                    | Q(last_name__icontains=firstNameQ)
                    | Q(first_name__icontains=lastNameQ)
                    | Q(last_name__icontains=lastNameQ) )\
                .values('uid', 'profile_picture', 'first_name', 'last_name', 'title')

        # Get dictionary data
        searchUserPostDictList = SearchUserPostSrl(searchUserPostQsList, many=True).data

         # Return success report
        return \
            Response(
                data= \
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Returned search results",
                        'data': searchUserPostDictList
                    }).data,
                status=status.HTTP_200_OK)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot return search result: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)
