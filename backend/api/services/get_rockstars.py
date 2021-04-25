from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from api.db.models import Team
#from api.db.serializers import RockstarPostSerializer
from api.db.models import User
import json
import jwt
import os 
import random

#get rockstar
#How to call this API: basically just call this api with the jwt token, no params.
@api_view(["GET"])
def get_rockstars(request):
    try:
        token = request.META.get('HTTP_AUTHORIZATION').replace("Bearer ","")
        uid = jwt.decode(token, os.environ.get('SECRET_KEY'), os.environ.get('ALGORITHM'))["user_id"]
        all_users = User.objects.all()
        user = User.objects.get(uid=uid)
        cid_current = Team.objects.get(tid=user.tid).cid
        Ret = {}
        vals = {"values":[]}
        Ret["MVP"] = {"count":0,"uid": "","name":"","profile_picture":"" }
        vals["values"].append("MVP")
        for value in user.values_scores:
            Ret[value] = {"count":0,"uid": "","name":"","profile_picture":"" }
            vals["values"].append(value)
        for user in all_users:
            if Team.objects.get(tid=user.tid).cid == cid_current:
                count = 0
                for value in user.values_scores:
                    count += user.values_scores[value]
                    if Ret[value]["count"] < user.values_scores[value]:
                        Ret[value]["count"] = user.values_scores[value]
                        Ret[value]["uid"] = user.uid
                        Ret[value]["name"] = user.first_name + " " + user.last_name
                        if not user.profile_picture == "":
                            Ret[value]["profile_picture"] =  user.profile_picture.url
                        else:
                            Ret[value]["profile_picture"] = ""
                    elif Ret[value]["count"] == user.values_scores[value] and not user.values_scores[value] == 0:
                        if random.choice([True, False]):
                            Ret[value]["count"] = user.values_scores[value]
                            Ret[value]["uid"] = user.uid
                            Ret[value]["name"] = user.first_name + " " + user.last_name
                            if not user.profile_picture == "":
                                Ret[value]["profile_picture"] =  user.profile_picture.url
                            else:
                                Ret[value]["profile_picture"] = ""
            if count > Ret["MVP"]["count"]:
                Ret["MVP"]["count"] = count
                Ret["MVP"]["uid"] = user.uid
                Ret["MVP"]["name"] = user.first_name + " " + user.last_name
                if not user.profile_picture == "":
                        Ret["MVP"]["profile_picture"] =  user.profile_picture.url
                else:
                        Ret["MVP"]["profile_picture"] = ""
            elif Ret["MVP"]["count"] == count and not count == 0:
                if random.choice([True, False]):
                    Ret["MVP"]["count"] = count
                    Ret["MVP"]["uid"] = user.uid
                    Ret["MVP"]["name"] = user.first_name + " " + user.last_name
                    if not user.profile_picture == "":
                        Ret["MVP"]["profile_picture"] =  user.profile_picture.url
                    else:
                        Ret["MVP"]["profile_picture"] = ""     
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
