# Generated by Django 3.1.7 on 2021-04-25 21:20

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210425_2116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default=datetime.datetime(2021, 4, 25, 21, 20, 9, 698491, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='recognition',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default=datetime.datetime(2021, 4, 25, 21, 20, 9, 701447, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='team',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default=datetime.datetime(2021, 4, 25, 21, 20, 9, 699306, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default=datetime.datetime(2021, 4, 25, 21, 20, 9, 700479, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default='avt8644294.png', null=True, upload_to='images/'),
        ),
    ]