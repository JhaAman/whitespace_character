# Generated by Django 3.1.7 on 2021-03-26 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210326_0231'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='flag_count',
        ),
        migrations.AddField(
            model_name='recognition',
            name='flag_count',
            field=models.IntegerField(default=0),
        ),
    ]
