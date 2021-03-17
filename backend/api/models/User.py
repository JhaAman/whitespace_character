from django.db import models\

class User(models.Model):
    uid = models.CharField(primary_key= True,max_length= 100, default="0",auto_created=True,editable=False)
    tid = models.CharField(max_length=8, default='00000000')
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length = 70, null= True, blank=False,unique=True)
    password = models.CharField(max_length=20, default= 'TeamBlankSpace')