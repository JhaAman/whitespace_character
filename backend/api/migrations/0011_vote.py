# Generated by Django 3.1.7 on 2021-03-03 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210303_1250'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vid', models.CharField(default='00000000', max_length=8)),
                ('tags', models.CharField(max_length=120)),
            ],
        ),
    ]