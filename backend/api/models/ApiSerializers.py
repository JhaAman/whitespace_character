from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from api.models.Company import *
from api.models.Team import *
from api.models.User import *
from api.models.Recognition import *
from api.models.Notification import *


"""
Accepts JSON of the form:
  {
    "uid": "12345678"
  }
"""
class UidFormSerializer(serializers.Serializer):
  uid = serializers.CharField(max_length=8)
  def validate_uid(self, value):
    if not User.objects.filter(uid=value).exists():
      raise serializers.ValidationError("{id} user id does not exist".format(id=value))
    return value


"""
Accepts JSON of the form:
  {
    "rid": "12345678"
  }
"""
class RidFormSerializer(serializers.Serializer):
  rid = serializers.CharField(required=True)
  def validate_rid(self, value):
    if not Recognition.objects.filter(rid=value).exists():
      raise serializers.ValidationError("{id} recognition id does not exist".format(id=value))
    return value


"""
Accepts JSON of the form:
  {
    "cid": "12345678"
  }
"""
class CidFormSerializer(serializers.Serializer):
  cid = serializers.CharField(required=True)
  def validate_rid(self, value):
    if not Company.objects.filter(cid=value).exists():
      raise serializers.ValidationError("{id} company id does not exist".format(id=value))
    return value


"""
Accepts JSON of the form:
  {
    "tid": "12345678"
  }
"""
class TeamFormSerializer(serializers.Serializer):
  tid = serializers.CharField(required=True)
  def validate_rid(self, value):
    if not Team.objects.filter(tid=value).exists():
      raise serializers.ValidationError("{id} team id does not exist".format(id=value))
    return value


"""
Accepts JSON of the form:
  {
    "nid": "12345678"
  }
"""
class NidFormSerializer(serializers.Serializer):
  nid = serializers.CharField(required=True)
  def validate_nid(self, value):
    if not Notification.objects.filter(nid=value).exists():
      raise serializers.ValidationError("{id} notification id does not exist".format(id=value))
    return value