# Generated by Django 4.0.2 on 2022-02-09 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_playlist_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='description',
            field=models.TextField(default=''),
        ),
    ]