import { Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function Home() {
  const [courseData,setCourseData]=useState([]);   
  const [popularcourseData,setpopularcourseData]=useState([]);   
  const [popularteacherData,setpopularteacherData]=useState([]);   
  const [testimonialData,settestimonialData]=useState([]); 
    // Fetch courses when page load
    useEffect(()=>{
        // Fetch 4 courses
        try{
            axios.get(baseUrl+'/course/?result=4')
            .then((res)=>{
                setCourseData(res.data.results);
            });
        }catch(error){
            console.log(error);
        }

        // Fetch popular courses
        try{
          axios.get(baseUrl+'/popular-courses/?popular=1')
          .then((res)=>{
            setpopularcourseData(res.data);
          });
        }catch(error){
            console.log(error);
        }

         // Fetch popular teachers
        try{
          axios.get(baseUrl+'/popular-teachers/?popular=1')
          .then((res)=>{
            setpopularteacherData(res.data);
          });
        }catch(error){
            console.log(error);
        }

         // Fetch student testimonial
        try{
          axios.get(baseUrl+'/student-testimonial/')
          .then((res)=>{
            settestimonialData(res.data);
          });
        }catch(error){
            console.log(error);
        }

    },[]);  

  return (
    <div className="container mt-4">
      {/* Latest Courses */}
      <h3 className="pb-1 mb-4">Latest Courses <Link to="/all-courses" className="float-end btn btn-primary">See All</Link></h3>
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
      {/* Popular Courses */}
      <h3 className="pb-1 mb-4 mt-5">Popular Courses <Link to="/popular-courses" className="float-end btn btn-primary">See All</Link></h3>
      <div className="row mb-4">
        {popularcourseData && popularcourseData.map((row,index)=>
          <div className="col-md-3">
            <div className="card">
              <Link to={`/detail/${row.course.id}`}><img src={row.course.featured_img} className="card-img-top" alt={row.course.title} /></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></h5>       
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: {row.rating}/5</span>
                  <span className="float-end">Views: {row.course.course_views}</span>
                </div>
              </div>
            </div>
          </div>  
        )}
      </div>
      {/* End Popular Courses */}
      {/* Popular Teachers */}
      <h3 className="pb-1 mb-4 mt-5">Popular Teachers <Link to="/popular-teachers" className="float-end btn btn-primary">See All</Link></h3>
      <div className="row mb-4">
        {popularteacherData && popularteacherData.map((teacher,index)=>
          <div className="col-md-3">
            <div className="card">
            <Link to={`/teacher-detail/${teacher.id}`}><img src={teacher.profile_img} className="card-img-top" alt="..." /></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link></h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Total Courses: {teacher.total_teacher_courses}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>  
      {/* End Popular Teachers */}
      {/* Student Testimonial */}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
        <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {testimonialData && testimonialData.map((row,index)=>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : "" }></button>
            )}
          </div>
          <div className="carousel-inner">
            {testimonialData && testimonialData.map((row,i)=>
              <div className={i === 0 ? "carousel-item text-center active" : "carousel-item text-center" }>
                <figure class="text-center">
                  <blockquote class="blockquote">
                    <p>{row.reviews}</p>
                  </blockquote>
                  <figcaption class="blockquote-footer">
                    {row.course.title} <cite title="Source Title">{row.student.full_name}</cite>
                  </figcaption>
                </figure>
              </div>
            )}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      {/* End Student Testimonial */}
    </div>
  );
}

export default Home;
