import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';
function EnrolledStudents(){
    const [studentData,setStudentData]=useState([]);   

    let {course_id}=useParams();
    // console.log(teacherId);
    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/fetch-enrolled-students/'+course_id)
            .then((res)=>{
                setStudentData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);   



    // console.log(courseData);

    // const {teacherId} = useParams(); // Lấy teacherId

    // useEffect(() => {
    //     const fetchCourses = async () => { 
    //         try {
    //             const response = await axios.get(`${baseUrl}/teacher-courses/${teacherId}`);
    //             setCourseData(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchCourses(); // gọi để fetch dữ liệu
    // }, [teacherId]); // phụ thuộc vào teacherId để fetch lại khi thay đổi

    // // ... rest of your component

    // console.log(teacherId);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>      
                <section className='col-md-9'>
                    <div className='card'>
                            <h5 className='card-header'>Enrolled Student List</h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Username</th>
                                            <th>Interested Categories</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((row,index) => 
                                        <tr>
                                            <td>{row.student.full_name}</td>
                                            <td>{row.student.email}</td>
                                            <td>{row.student.username}</td>
                                            <td>             
                                                {row.student.interested_categories}
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

export default EnrolledStudents;   