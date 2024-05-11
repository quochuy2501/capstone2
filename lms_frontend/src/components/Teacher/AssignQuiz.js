import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import CheckQuizinCourse from "./CheckQuizinCourse"
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';
function AssignQuiz(){
    const [quizData,setquizData]=useState([]);   
    const [courseData,setcourseData]=useState([]);  
    const teacherId=localStorage.getItem('teacherId');
    const {course_id}=useParams();

    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/teacher-quiz/'+teacherId)
            .then((res)=>{
                setquizData(res.data);
            });
        }catch(error){
            console.log(error);
        }

        //Fetch Courses
        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((res)=>{
                console.log(res);
                setcourseData(res.data);
            });
        }catch(error){
            console.log(error);
        }

    },[]);   

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>      
                <section className='col-md-9'>
                    <div className='card'>
                            <h5 className='card-header'>Assign Quiz <span className="text-primary">({courseData.title})</span></h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quizData.map((row,index) => 
                                            <tr>
                                                <td>
                                                    <Link to={`/all-questions/`+row.id}>{row.title}</Link>
                                                </td>               
                                                    <CheckQuizinCourse quiz={row.id} course={course_id} />                                                  
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

export default AssignQuiz;   