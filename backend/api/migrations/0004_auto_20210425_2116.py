# Generated by Django 3.1.7 on 2021-04-25 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210425_1622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default='avt4940543.png', null=True, upload_to='images/'),
        ),
    ]