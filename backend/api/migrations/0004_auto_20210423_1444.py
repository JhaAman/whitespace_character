# Generated by Django 3.1.7 on 2021-04-23 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210423_1436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-23 14:44:37', null=True),
        ),
        migrations.AlterField(
            model_name='recognition',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-23 14:44:37'),
        ),
        migrations.AlterField(
            model_name='team',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-23 14:44:37', null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-23 14:44:37', null=True),
        ),
    ]
