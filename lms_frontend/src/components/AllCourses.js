import { Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/course/';

function AllCourses(){
    const [courseData,setCourseData]=useState([]);   
    const [nextUrl,setnextUrl]=useState();  
    const [previousUrl,setpreviousUrl]=useState();  
    // Fetch courses when page load
    useEffect(()=>{
        fetchData(baseUrl);
    },[]);   

    // console.log(courseData);

    const paginationHandler = (url)=> {
        fetchData(url);
    }   

    function fetchData(url){
        try{
            axios.get(url)
            .then((res)=>{
                setnextUrl(res.data.next);
                setpreviousUrl(res.data.previous);
                setCourseData(res.data.results);
            });
        }catch(error){
            console.log(error);
        }
    }  

    return (
        <div className="container mt-3">
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4">Latest Courses</h3>
        <div className="row mb-4">
            {courseData && courseData.map((course,index)=>
            <div className="col-md-3 mb-4">
                <div className="card">
                    <Link to={`/detail/${course.id}`}><img src={course.featured_img} className="card-img-top" alt={course.title} /></Link>
                    <div className="card-body">
                        <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                    </div>
                </div>
            </div>  
            )}
        </div>
        {/* End Latest Courses */}
        {/* Pagination Start */}
        <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center">
                {previousUrl &&
                    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(previousUrl)}><i class="bi bi-arrow-left"></i> Previous</button></li>
                }
                {nextUrl &&
                    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(nextUrl)}>Next <i class="bi bi-arrow-right"></i></button></li>
                }              
            </ul>
        </nav>
        {/* End */}
        </div>
    );    
}

export default AllCourses;