import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherDetail(){
    const [teacherData,setTeacherData]=useState([]);
    const [courseData,setCourseData]=useState([]); 
    const [skillList,setskillList]=useState([]); 

    let {teacher_id}=useParams();

    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/teacher/'+teacher_id)
            .then((res)=>{
                setTeacherData(res.data);
                setCourseData(res.data.teacher_courses);   
                setskillList(res.data.skill_list);         
            });
        }catch(error){
            console.log(error);
        }
    },[]); 

    const icon_style={
        'font-size':'25px'
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src="/teacher (4).jpg" className="img-thumbnail" alt="Teacher Image" />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
                    <p className="fw-bold">Skills:&nbsp;
                        {skillList.map((skill,index) => 
                            <>
                                <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning">{skill.trim()}</Link>&nbsp;
                            </>
                        )}
                    </p>
                    <p className="fw-bold">Recent Course: <Link to="/category/php">ReactJs Course</Link></p>
                    <p>
                        {teacherData.facebook_url &&
                            <a href={teacherData.facebook_url} style={icon_style}><i class="bi bi-facebook"></i></a>
                        }
                        {teacherData.twitter_url &&
                            <a href={teacherData.twitter_url} style={icon_style}><i class="bi bi-twitter ms-2"></i></a>
                        }
                        {teacherData.instagram_url &&
                            <a href={teacherData.instagram_url} style={icon_style}><i class="bi bi-instagram ms-2"></i></a>
                        }
                        {teacherData.website_url &&
                            <a href={teacherData.website_url} style={icon_style}><i class="bi bi-globe ms-2"></i></a>
                        }
                    </p>
                </div>
            </div>
            {/* Course Videos */}
            <div className="card mt-4">
                <h5 className="card-header">
                    Course List
                </h5>
                <div className="list-group list-group-flush">
                    {courseData.map((course,index)=>
                        <Link to={`/detail/${course.id}`} class="list-group-item list-group-item-action">{course.title}</Link>
                    )}   
                </div>
            </div>
        </div>
    );
}

export default TeacherDetail;