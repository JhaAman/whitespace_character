# Generated by Django 3.1.7 on 2021-03-26 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_company_badges'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='badges',
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='user',
            name='badges',
            field=models.JSONField(default=list),
        ),
    ]
