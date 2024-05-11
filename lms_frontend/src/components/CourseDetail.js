import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const siteUrl='http://127.0.0.1:8000/';
const baseUrl='http://127.0.0.1:8000/api';

function CourseDetail(){
    const [courseData,setCourseData]=useState([]);  
    const [chapterData,setChapterData]=useState([]);  
    const [teacherData,setTeacherData]=useState([]);  
    const [realtedcourseData,setrealtedcourseData]=useState([]); 
    const [techList,settechList]=useState([]); 
    const [userLoginStatus,setuserLoginStatus]=useState(); 
    const [enrollStatus,setenrollStatus]=useState(); 
    const [ratingStatus,setratingStatus]=useState(); 
    const [courseViews,setcourseViews]=useState(0); 
    const [AvgRating,setAvgRating]=useState(0); 
    const [favoriteStatus,setfavoriteStatus]=useState(); 
    let {course_id}=useParams();
    const studentId=localStorage.getItem('studentId');

    // Fetch courses when page load
    useEffect(()=>{
        //Fetch Courses
        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((res)=>{
                setCourseData(res.data);
                setChapterData(res.data.course_chapters);
                setTeacherData(res.data.teacher);
                setrealtedcourseData(JSON.parse(res.data.related_videos));
                settechList(res.data.tech_list);
                if(res.data.course_rating!='' && res.data.course_rating!=null){
                    setAvgRating(res.data.course_rating)
                }   
            });

            // Update View
            axios.get(baseUrl+'/update-view/'+course_id)
            .then((res)=>{
                setcourseViews(res.data.views)
            });

        }catch(error){
            console.log(error);
        }

        //Fetch enroll status
        try{
            axios.get(baseUrl+'/fetch-enroll-status/'+studentId+'/'+course_id)
            .then((res)=>{
                if(res.data.bool==true){
                    setenrollStatus('success');
                }   
            });
        }catch(error){
            console.log(error);
        }

        //Fetch rating status
        try{
            axios.get(baseUrl+'/fetch-rating-status/'+studentId+'/'+course_id)
            .then((res)=>{
                if(res.data.bool==true){
                    setratingStatus('success');
                }   
            });
        }catch(error){
            console.log(error);
        }

        //Fetch favorite status
        try{
            axios.get(baseUrl+'/fetch-favorite-status/'+studentId+'/'+course_id)
            .then((res)=>{
                if(res.data.bool==true){
                    setfavoriteStatus('success');
                }else{
                    setfavoriteStatus('');
                }
            });
        }catch(error){
            console.log(error);
        }

        const studentLoginStatus=localStorage.getItem('studentLoginStatus')
        if(studentLoginStatus==='true'){
            setuserLoginStatus('success');
        }   

    },[]); 

    document.title=`Course - ${courseData.title}`;

    //Enroll in the course
    const enrollCourse = ()=>{
        const _formData=new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);

        try{
            axios.post(baseUrl+'/student-enroll-course/',_formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200||res.status==201){
                    Swal.fire({ 
                        title: 'You have successfully enrolled in this course',
                        icon: 'success',
                        toast:true,
                        timer:10000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: false
                    });
                    setenrollStatus('success');
                } 
            });
        }catch(error){
            console.log(error);
        }     
    }

    //Mark as favorite course
    const markAsFavorite = ()=>{
        const _formData=new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);
        _formData.append('status',true);

        try{
            axios.post(baseUrl+'/student-add-favorite-course/',_formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200||res.status==201){
                    Swal.fire({ 
                        title: 'This course has been added in your wish list',
                        icon: 'success',
                        toast:true,
                        timer:10000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: false
                    });
                    setfavoriteStatus('success');
                } 
            });
        }catch(error){
            console.log(error);
        }     
    }  
    //End

    //Remove from favorite course
    const removeFavorite = (pk)=>{
        const _formData=new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);
        _formData.append('status',false);

        try{
            axios.get(baseUrl+'/student-remove-favorite-course/'+course_id+'/'+studentId,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200||res.status==201){
                    Swal.fire({ 
                        title: 'This course has been removed from your wish list',
                        icon: 'success',
                        toast:true,
                        timer:10000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: false
                    });
                    setfavoriteStatus('');
                } 
            });
        }catch(error){
            console.log(error);
        }     
    }  
    //End

    //Add Rating
    const [ratingData, setratingData]=useState({
        rating:'',
        reviews:''
    });

    const handleChange=(event)=>{
        setratingData({
            ...ratingData,
            [event.target.name]:event.target.value
        });
    }

    const formSubmit=()=>{
        const _formRatingData=new FormData();
        _formRatingData.append('course',course_id);
        _formRatingData.append('student',studentId);  
        _formRatingData.append('rating',ratingData.rating);
        _formRatingData.append('reviews',ratingData.reviews);

        try{
            axios.post(baseUrl+'/course-rating/',_formRatingData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200||res.status==201){
                    Swal.fire({ 
                        title: 'Rating has been saved',
                        icon: 'success',
                        toast:true,
                        timer:5000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: false
                    });
                    window.location.reload();
                }
            });
        }catch(error){
            console.log(error);           
        }   
    };

    return (
        <div className="container mt-3 pb-2">
            <div className="row">
                <div className="col-4">
                    <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title} />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                    <p className="fw-bold">Techs:&nbsp;
                    {techList.map((tech,index) => 
                        <>
                            <Link to={`/category/${tech.trim()}`} className="badge badge-pill text-dark bg-warning">{tech.trim()}</Link>&nbsp;
                        </>
                    )}
                    </p>
                    <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                    <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Student(s) </p>
                    <p className="fw-bold">
                        Rating: {AvgRating}/5
                        { enrollStatus === 'success' && userLoginStatus === 'success' &&
                            <>
                            {ratingStatus != 'success' && 
                                <button className="btn btn-success btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                            }  
                            {ratingStatus == 'success' && 
                                <small className="badge bg-info text-dark ms-2">You already rated this course</small>
                            } 
                            <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Rate for {courseData.title}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1" class="form-label">Rating</label>
                                                    <select onChange={handleChange} className="form-control" name="rating"> 
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>                          
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleInputPassword1" class="form-label">Review</label>
                                                    <textarea onChange={handleChange} className="form-control" name="reviews" rows="10"></textarea>
                                                </div>
                                                <button type="button" onClick={formSubmit} class="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        }
                    </p>            
                    <p className="fw-bold">
                        Views: {courseViews}
                    </p>
                    {enrollStatus ==='success' && userLoginStatus =='success' &&
                        <p><span>You are already enrolled in this course</span></p>
                    }
                    {userLoginStatus ==='success' && enrollStatus !== 'success' &&
                        <p><button onClick={enrollCourse} type="button" className="btn btn-success">Enroll in this course</button></p>
                    }
                    {userLoginStatus ==='success' && favoriteStatus !== 'success' &&
                        <p><button onClick={markAsFavorite} title="Add in your favorite course list" type="button" className="btn btn-outline-danger"><i class="bi bi-heart-fill"></i></button></p>
                    }
                    {userLoginStatus ==='success' && favoriteStatus === 'success' &&
                        <p><button onClick={removeFavorite} title="Remove from your favorite course list" type="button" className="btn btn-danger"><i class="bi bi-heart-fill"></i></button></p>
                    }
                    {userLoginStatus !=='success' &&
                        <p><Link to="/user-login">Please login to enroll in this course</Link></p>
                    }
                </div>
            </div>
            {/* Course Videos */}
            {enrollStatus ==='success' && userLoginStatus =='success' &&
            <div className="card mt-4">
                <h5 className="card-header">
                    In this course
                </h5>
                <ul className="list-group list-group-flush">
                    {chapterData.map((chapter,index) => 
                        <li className="list-group-item" key={chapter.id}>{chapter.title}
                            <span className="float-end">
                                <span className="me-5">1 Hour 30 Minutes</span>
                                <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi-youtube"></i></button>
                            </span>   
                            {/* Video Modal Start */}
                            <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="ratio ratio-16x9">
                                                <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            {/* End Video Modal */}
                        </li>
                    )}
                </ul>
            </div>
            }
            <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
            <div className="row mb-4">
            {realtedcourseData.map((rcourse,index) => 
                <div className="col-md-3">
                    <div className="card">
                        <Link target="__blank" to={`/detail/${rcourse.pk}`}><img src={`${siteUrl}media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title} /></Link>
                        <div className="card-body">
                        <h5 className="card-title"><Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
                        </div>
                    </div>
                </div>  
            )}
            </div>
        </div>
    );
}

export default CourseDetail;