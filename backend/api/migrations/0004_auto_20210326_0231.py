# Generated by Django 3.1.7 on 2021-03-26 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_team_flag_count'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='recognition',
            options={'verbose_name': 'Recognition'},
        ),
        migrations.AddField(
            model_name='user',
            name='profile_picutre',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]