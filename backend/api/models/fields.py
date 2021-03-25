from django.db import models
from api.services.constant import *


class IdField(models.CharField):
  def __init__(self, *args, **kwargs):
    kwargs['max_length'] = ID_LEN
    kwargs['unique'] = True
    super().__init__(*args, **kwargs)