# Generated by Django 5.0.3 on 2024-05-02 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0034_studymaterial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_views',
            field=models.BigIntegerField(default=0),
        ),
    ]
