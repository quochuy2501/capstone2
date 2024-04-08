import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';
function MyCourses(){
    const [courseData,setCourseData]=useState([]);   

    const teacherId=localStorage.getItem('teacherId');
    // console.log(teacherId);
    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/teacher-courses/'+teacherId)
            .then((res)=>{
                setCourseData(res.data);
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
                            <h5 className='card-header'>My Courses</h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Total Enrolled</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.map((course,index) => 
                                        <tr>
                                            <td>{course.title}</td>
                                            <td><img src={course.featured_img} width="80" className="rounded" alt={course.title} /></td>
                                            <td><Link to="/">123</Link></td>
                                            <td>
                                                <button className='btn btn-danger btn-sm'>Delete</button>
                                                <Link class="btn btn-success btn-sm ms-2" to={`/add-chapter/`+course.id}>Add Chapter</Link>
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