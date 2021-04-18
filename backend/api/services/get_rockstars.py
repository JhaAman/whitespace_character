from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from api.db.models import Team
from api.db.serializers import TeamSerializer
from api.db.models import User
from api.db.serializers import UserSerializer
from api.db.serializers import UidFormSerializer
import json
import random

#get rockstar
@api_view(["GET"])
def get_rockstars(request):
    try:
        if not 'uid' in request.query_params:
            return Response("Missing uid", status.HTTP_400_BAD_REQUEST)
        uid = request.query_params['uid']
        all_users = User.objects.all()
        user = User.objects.get(uid=uid)
        cid_current = Team.objects.get(tid=user.tid).cid
        values = user.values_scores
        Ret = {}
        vals = {"values": []}
        Ret["MVP"] = (0,"","")
        vals["values"].append("MVP")
        for value in values:
            Ret[value] = (0,"","")
            vals["values"].append(value)
        for user in all_users:
            if Team.objects.get(tid=user.tid).cid == cid_current:
                count = 0
                for value in values:
                    count += user.values_scores[value]
                    if Ret[value][0] < user.values_scores[value]:
                        Ret[value] = (user.values_scores[value],user.first_name + " "  + user.last_name,user.uid)
                    elif Ret[value][0] == user.values_scores[value] and not user.values_scores[value] == 0:
                        if random.choice([True, False]):
                            Ret[value] = (user.values_scores[value],user.first_name + " "  + user.last_name,user.uid)
                if count > Ret["MVP"][0]:
                    Ret["MVP"] = (count,user.first_name + " "  + user.last_name,user.uid)
                elif Ret["MVP"][0] == count and not count == 0:
                    if random.choice([True, False]):
                        Ret["MVP"] = (count,user.first_name + " "  + user.last_name,user.uid)      
        for value in values:
            Ret[value] = Ret[value][1]
        Ret["MVP"] = Ret["MVP"][1]
        return Response((vals,Ret) ,status=status.HTTP_200_OK)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)

#reset in case the automatic reset fail.
@api_view(["POST"])
def reset_count(request):
    try:
        if request.data["role"] == "mng" :
            all_users = User.objects.all()
            for user in all_users:
                user.values_scores = dict().fromkeys(user.values_scores, 0)
                user.save()
            return Response(None, status.HTTP_200_OK)
        else:
            return Response(None, status.HTTP_401_UNAUTHORIZED)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
