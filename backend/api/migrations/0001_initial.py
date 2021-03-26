# Generated by Django 3.1.7 on 2021-03-26 12:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('date_created', models.DateTimeField(auto_created=True, auto_now_add=True, null=True)),
                ('cid', models.CharField(auto_created=True, default='0', editable=False, max_length=8, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=60, unique=True)),
                ('values', models.JSONField()),
                ('badges', models.JSONField(default=list)),
            ],
            options={
                'verbose_name': 'Company',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('date_created', models.DateTimeField(auto_created=True, auto_now_add=True, null=True)),
                ('tid', models.CharField(auto_created=True, default='0', max_length=8, primary_key=True, serialize=False, unique=True)),
                ('cid', models.CharField(max_length=8)),
                ('name', models.CharField(max_length=60, unique=True)),
                ('values_scores', models.JSONField(default=list)),
                ('badges', models.JSONField(default=list)),
                ('company', models.ForeignKey(auto_created=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.company')),
            ],
            options={
                'verbose_name': 'Team',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('date_created', models.DateTimeField(auto_created=True, auto_now_add=True, null=True)),
                ('uid', models.CharField(auto_created=True, default='0', max_length=8, primary_key=True, serialize=False, unique=True)),
                ('tid', models.CharField(max_length=8)),
                ('first_name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=60)),
                ('email', models.EmailField(max_length=60)),
                ('password', models.CharField(max_length=120)),
                ('user_role', models.CharField(choices=[('emp', 'employee'), ('mng', 'manager'), ('dev', 'developer')], default='emp', max_length=3)),
                ('title', models.CharField(blank=True, default='', max_length=60)),
                ('badges', models.JSONField(default=list)),
                ('profile_picutre', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('values_scores', models.JSONField(default=list)),
                ('team', models.ForeignKey(auto_created=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.team')),
            ],
            options={
                'verbose_name': 'User',
            },
        ),
        migrations.CreateModel(
            name='Recognition',
            fields=[
                ('date_created', models.DateTimeField(auto_created=True, auto_now_add=True)),
                ('rid', models.CharField(auto_created=True, default='0', max_length=8, primary_key=True, serialize=False, unique=True)),
                ('uid_from', models.CharField(max_length=8)),
                ('uid_to', models.CharField(max_length=8)),
                ('tags', models.JSONField(blank=True, default=dict)),
                ('flag_count', models.IntegerField(default=0)),
                ('comments', models.CharField(blank=True, default='', max_length=120)),
                ('user_from', models.ForeignKey(auto_created=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userid_from', to='api.user')),
                ('user_to', models.ForeignKey(auto_created=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userid_to', to='api.user')),
            ],
            options={
                'verbose_name': 'Recognition',
            },
        ),
    ]
