# Generated by Django 3.0.5 on 2021-03-08 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_vote'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='BlankSpace@gmail.com', max_length=70),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='000000000', max_length=9),
        ),
    ]
