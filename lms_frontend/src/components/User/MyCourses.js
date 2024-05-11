import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';

function MyCourses(){

    const [courseData,setcourseData]=useState([]); 
    const studentId=localStorage.getItem('studentId');

    // Fetch students when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/fetch-enrolled-courses/'+studentId)
            .then((res)=>{
                setcourseData(res.data);
            });
        }catch(error){
            console.log(error);
        }
        document.title="My Courses";
    },[]);  

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>      
                <section className='col-md-9'>
                    <div className='card'>
                            <h5 className='card-header'>My Courses</h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created By</th>
                                            <th>Quiz</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.map((row,index) => 
                                            <tr>
                                                <td><Link to={`/detail/`+row.course.id}>{row.course.title}</Link></td>
                                                <td><Link to={`/teacher-detail/`+row.course.teacher.id}>{row.course.teacher.full_name}</Link></td>
                                                <td>
                                                    <Link className="btn btn-sm btn-warning" to={`/course-quiz/`+row.course.id}>Quiz List</Link>
                                                    <Link class="btn btn-primary btn-sm ms-1" to={`/user/study-materials/`+row.course.id}>Study Material</Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </section>
            </div>
        </div>    
    );
}

export default MyCourses;