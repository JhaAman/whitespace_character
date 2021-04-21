from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from api.db.models import User
from api.db.serializers import UidFormSerializer
from api.db.serializers import ApiResponseSerializer as ApiRespSrl

"""
Accepts JSON of the form:
  {
    "uid": "12345678",
    "badgeTitle": "Your badge title here"
  }
"""
@api_view(["PUT"])
def put_badge(request):
  try:
    # Serializer for provided uid
    serializer = UidFormSerializer(data={"uid": request.data['uid']})

    # If data fields are invalid, return error report
    if not serializer.is_valid():
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_404_NOT_FOUND,
                        'msg': "Invalid uid",
                        'trace': serializer.errors
                    }).data,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    # Find the user and append the provided badge to their "badges" array
    userRef = User.objects.get(uid = request.data['uid'])
    userRef.badges.append(request.data['badgeTitle'])
    userRef.save()
    # Return success report
    return \
    Response(
        data= \
            ApiRespSrl({
                'status': status.HTTP_200_OK,
                'msg': "Added badge to user"
            }).data,
        status=status.HTTP_200_OK)

  except ValueError as e:
    # If Exception occurs, return error report
        return \
            Response(
                data=
                    ApiRespSrl({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'msg': "Cannot add badge to user: Exception ocurred",
                        'trace': e.args[0]
                    }).data,
                status=status.HTTP_400_BAD_REQUEST)