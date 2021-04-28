"""Company Endpoints

Org: Team Whitespace Character
Authors: 
    Khai Nguyen, khainguyen@umass.edu
    Myron Lacey, 
    Duy Pham,
    Khang Nguyen, 
Created: April 4th, 2021

API endpoints in service of Company model object
"""

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework import status

from api.db.models import \
    Company as Comp

from api.db.serializers import \
    CompanySerializer as CompSrl, \
    ApiResponseSerializer as ApiRespSrl, \
    CidFormSerializer as CidFormSrl


@api_view(["POST"])
def create(request):
    try:
        # Serialize incoming request
        requestSrl = CompSrl(data=request.data)

        # If data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data=
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create Company object: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Save object to Company database
        requestSrl.save()
        # Return success report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_201_CREATED,
                        'msg': "Created Company object"
                    }).data,
                status=status.HTTP_201_CREATED)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot create Company object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get(request):
    try:
        # Serialize incoming request
        requestSrl = CidFormSrl(data=request.data)

        # If data fields are invalid, return error report
        if not requestSrl.is_valid():
            return \
                Response(
                    data=
                        ApiRespSrl({
                            'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'msg': "Cannot create Company object: Invalid field",
                            'trace': requestSrl.errors
                        }).data,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Get validated ata
        requestDict = requestSrl.validated_data
        # Get Company object
        compObj = Comp.objects.get(cid=requestDict['cid'])
        # Deserialize object
        compDict = CompSrl(compObj).data
        # Return success report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_200_OK,
                        'msg': "Fetched Company object",
                        'datat': compDict
                    }).data,
                status=status.HTTP_200_OK)

    except ValueError as e:
        # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot fetch Company object: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)


# @api_view(['UPDATE'])
# def update(request):
#     # Serialize incoming request
#     requestSrl = CidFormSrl(data=request.data)

#     # If data fields are invalid, return error report
#     if not requestSrl.is_valid():
#         return \
#             Response(
#                 data=
#                     ApiRespSrl({
#                         'status': status.HTTP_422_UNPROCESSABLE_ENTITY,
#                         'msg': "Cannot create Company object: Invalid field",
#                         'trace': requestSrl.errors
#                     }).data,
#                 status=status.HTTP_422_UNPROCESSABLE_ENTITY)

#     # Get validated ata
#     requestDict = requestSrl.validated_data
#     # Get Company object
#     compObj = Comp.objects.get(cid=requestDict['cid'])
#     # Deserialize object
#     compDict = CompSrl(compObj).data
#     # Return success report
#     return \
#         Response(
#             data=
#                 ApiRespSrl({
#                     'status': status.HTTP_200_OK,
#                     'msg': "Fetched Company object",
#                     'datat': compDict
#                 }).data,
#             status=status.HTTP_200_OK)



