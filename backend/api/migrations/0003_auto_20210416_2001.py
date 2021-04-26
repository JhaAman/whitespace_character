# Generated by Django 3.1.7 on 2021-04-16 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210416_0136'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='date_created',
            field=models.DateTimeField(auto_created=True, auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='recognition',
            name='date_created',
            field=models.DateTimeField(auto_created=True, auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='team',
            name='date_created',
            field=models.DateTimeField(auto_created=True, auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_created',
            field=models.DateTimeField(auto_created=True, auto_now_add=True, null=True),
        ),
    ]
