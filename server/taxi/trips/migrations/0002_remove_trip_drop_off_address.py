# Generated by Django 3.2.9 on 2021-12-28 18:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trip',
            name='drop_off_address',
        ),
    ]
