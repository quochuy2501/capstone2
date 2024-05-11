# Generated by Django 5.0.3 on 2024-05-05 18:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0039_student_login_via_otp_teacher_login_via_otp'),
    ]

    operations = [
        migrations.CreateModel(
            name='TeacherStudentChat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msg_text', models.TextField()),
                ('msg_from', models.CharField(max_length=100)),
                ('msg_time', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.student')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.teacher')),
            ],
            options={
                'verbose_name_plural': '18. Teacher Student Messages',
            },
        ),
    ]
