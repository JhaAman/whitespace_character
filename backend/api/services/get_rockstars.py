from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from api.models.Team import Team
from api.models.Team import TeamSerializer
from api.models.User import User
from api.models.User import UserSerializer
from api.models.ApiSerializers import UidFormSerializer
import json

@api_view(["GET"])
def get_rockstars(request):
    try:
        serializer = UidFormSerializer(data=request.data)
        all_users = User.objects.all()
        if serializer.is_valid():
            user = User.objects.get(uid=serializer.data['uid'])
            tid_current = user.tid
            cid_current = Team.objects.get(tid=tid_current).cid
            values = user.values_scores
            Ret = {}
            vals = {"value":[]}
            for value in values:
                Ret[value] = (0,"")
                vals["value"].append(value)
            for user in all_users:
                if Team.objects.get(tid=user.tid).cid == cid_current:
                    for value in values:
                        if Ret[value][0] < user.values_scores[value]:
                            Ret[value] = (user.values_scores[value],user.first_name + " "  + user.last_name)
            return Response((vals,Ret), status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)