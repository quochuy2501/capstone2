from rest_framework import serializers
from rest_framework.response import Response
from . import models
from django.contrib.flatpages.models import FlatPage
from django.core.mail import send_mail

#   Lưu ý: Khi sử dụng depth=1 thì API ta xem được sẽ cụ thể chi tiết từng đối tượng 
#   nhưng lúc thực thi thao tác lệnh mà trong back-end có sử dụng các serializer liên quan 
#   thì phải tắt nó đi nếu không sẽ bị lỗi HttpRequest, không lưu thông tin mới vào database được

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['id','full_name','email','password','qualification','mobile_no','skills','otp_digit','login_via_otp','profile_img','teacher_courses','skill_list','total_teacher_courses','facebook_url','twitter_url','instagram_url','website_url'] 
        # depth=1  

    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1 

    def create(self, validate_data):
        email=self.validated_data['email']
        otp_digit=self.validated_data['otp_digit']
        instance = super(TeacherSerializer, self).create(validate_data)
        send_mail(
            "Verify Account",
            "Please verify your account",
            "team41@gmail.com",
            [email],
            fail_silently=False,
            html_message=f"<p>Your OTP is </p><p>{otp_digit}</p>"
        )
        return instance

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['total_teacher_courses','total_teacher_students','total_teacher_chapters']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseCategory
        fields=['id','title','description','total_courses']   

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Course
        fields=[
            'id',
            'category',
            'teacher',
            'title',
            'description',
            'featured_img',
            'techs',
            'course_chapters',
            'related_videos',
            'tech_list',
            'total_enrolled_students',
            'course_rating'
        ]  
        # depth=1 

    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2 
        # Lưu ý: Nếu tắt depth=1 của CourseSerializer thì 
        # thông tin "CourseBy: (tên giảng viên)" trong khoá học 
        # sẽ không hiển thị tên giảng viên dạy khoá học đó
        # bởi vì trong thông tin khoá học nếu muốn truy xuất tên giảng viên 
        # thì phải có tên (full_name) của 'teacher' để
        # từ đó có thể hiện thị thông tin của 'teacher' đó
        # Nếu không bật depth=1 thì API trả về chỉ hiển thị id của 'teacher'
        # chứ không có tên (full_name) hay các thông tin như detail hay skills của 'teacher' đó
        # nên buộc phải bật depth=1 để API trả về chi tiết mọi thông tin từ id 'teacher' đã có
        # để từ đó có thể truy xuất được từng thông tin cụ thể của 'teacher'

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Chapter
        fields=['id','course','title','description','video','remarks']  
        # depth=1

    def __init__(self, *args, **kwargs):
        super(ChapterSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1 

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['id','full_name','email','password','username','login_via_otp','login_via_otp','interested_categories','otp_digit','profile_img'] 

    def create(self, validate_data):
        email=self.validated_data['email']
        otp_digit=self.validated_data['otp_digit']
        instance = super(StudentSerializer, self).create(validate_data)
        send_mail(
            "Verify Account",
            "Please verify your account",
            "team41@gmail.com",
            [email],
            fail_silently=False,
            html_message=f"<p>Your OTP is </p><p>{otp_digit}</p>"
        )
        return instance

    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentCourseEnrollment
        fields=['id','course','student','enrolled_time']   
        # depth=1

    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentFavoriteCourse
        fields=['id','course','student','status']   
        # depth=1

    def __init__(self, *args, **kwargs):
        super(StudentFavoriteCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
                    
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseRating
        fields=['id','course','student','rating','reviews','review_time']   
        # depth=1  

    def _init_(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2 

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentAssignment
        fields=[
            'id',
            'teacher',
            'student',
            'title',
            'detail',
            'student_status',
            'add_time'
        ]  
        # depth=1 

    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['enrolled_courses','favorite_courses','complete_assignments','pending_assignments']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Notification
        fields=['teacher','student','notif_subject','notif_for']

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Quiz
        fields=[
            'id',
            'teacher',
            'title',
            'detail',
            'assign_status',
            'add_time'
        ]  
        # depth=1 

    def __init__(self, *args, **kwargs):
        super(QuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2 


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.QuizQuestions
        fields=['id','quiz','questions','ans1','ans2','ans3','ans4','right_ans']  
        # depth=1

    def __init__(self, *args, **kwargs):
        super(QuestionSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1 

class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseQuiz
        fields=['id','teacher','course','quiz','add_time']   
        # depth=1

    def __init__(self, *args, **kwargs):
        super(CourseQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class AttemptQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.AttemptQuiz
        fields=['id','student','quiz','question','right_ans','add_time']   
        # depth=1

    def __init__(self, *args, **kwargs):
        super(AttemptQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudyMaterial
        fields=['id','course','title','description','upload','remarks']  
        # depth=1

    def __init__(self, *args, **kwargs):
        super(StudyMaterialSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1 

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.FAQ
        fields=['question','answer']   

class FlatPagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=FlatPage
        fields=['id','title','content','url']   

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Contact
        fields=['id','full_name','email','query_txt'] 

class TeacherStudentChatSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.TeacherStudentChat
        fields=['id','teacher','student','msg_from','msg_text','msg_time']  

    def to_representation(self, instance):
        representation = super(TeacherStudentChatSerializer, self).to_representation(instance)
        representation['msg_time'] = instance.msg_time.strftime("%Y-%m-%d %H:%M")
        return representation  

