# Generated by Django 3.1.7 on 2021-04-16 01:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-16 01:36:01', null=True),
        ),
        migrations.AlterField(
            model_name='recognition',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-16 01:36:01'),
        ),
        migrations.AlterField(
            model_name='team',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-16 01:36:01', null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_created',
            field=models.DateTimeField(auto_created=True, default='2021-04-16 01:36:01', null=True),
        ),
    ]
