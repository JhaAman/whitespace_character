from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json

@api_view(["GET"])
def get_profile(request):
    try:
        profile_data = {
            "user": {
                "uid": "62298558",
                "created_date": "2021-03-20T02:34:30.183174Z",
                "tid": "52494679",
                "first_name": "John",
                "last_name": "Smith",
                "email": "John_Smith@company.com",
                "password": "1234",
                "user_role": "emp",
                "values_scores": {
                    "innovation": 0,
                    "simplicity": 0,
                    "collaboration" : 0 
                }
            },
            "badges": ["Rockstar of the month in Jan 2019", "Best Dressed", "Collaboration Badge", "Innovation Badge", "Simplicity Badge", "10 Recognitions Received"],
            "network": [
                {
                    "uid": "62298557",
                    "created_date": "2021-02-21T02:34:30.183174Z",
                    "tid": "52494679",
                    "first_name": "Arron",
                    "last_name": "Garcia",
                    "email": "Arron_Garcia@company.com",
                    "password": "1234",
                    "user_role": "emp",
                    "values_scores": {
                        "innovation": 0,
                        "simplicity": 0,
                        "collaboration" : 0 
                    }
                },
                {
                    "uid": "62298556",
                    "created_date": "2021-01-21T02:34:30.183174Z",
                    "tid": "52494679",
                    "first_name": "Lacy",
                    "last_name": "Lambert",
                    "email": "Lacy_Lambert@company.com",
                    "password": "1234",
                    "user_role": "emp",
                    "values_scores": {
                        "innovation": 0,
                        "simplicity": 0,
                        "collaboration" : 0 
                    }
                },
                {
                    "uid": "62298555",
                    "created_date": "2020-06-21T02:34:30.183174Z",
                    "tid": "52494679",
                    "first_name": "Diane",
                    "last_name": "Moyer",
                    "email": "Diane_Moyer@company.com",
                    "password": "1234",
                    "user_role": "emp",
                    "values_scores": {
                        "innovation": 0,
                        "simplicity": 0,
                        "collaboration" : 0 
                    }
                },
                {
                    "uid": "62298554",
                    "created_date": "2020-05-26T02:34:30.183174Z",
                    "tid": "52494679",
                    "first_name": "Briana",
                    "last_name": "Wilkinson",
                    "email": "Briana_Wilkinson@company.com",
                    "password": "1234",
                    "user_role": "emp",
                    "values_scores": {
                        "innovation": 0,
                        "simplicity": 0,
                        "collaboration" : 0 
                    }
                }
            ]
        }
        return JsonResponse(profile_data)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)