# Generated by Django 3.1.7 on 2021-04-26 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210426_1142'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default='avt2188421.png', null=True, upload_to='images/'),
        ),
    ]
