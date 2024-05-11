import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function EditCourse(){
    const [cats,setCats]=useState([]);   
    const [courseData, setCourseData]=useState({
        category:'',
        title:'',
        description:'',
        prev_img:'',
        f_img:'',
        techs:''
    });

    const {course_id}=useParams();
    //Fetch categories when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category')
            .then((res)=>{
                setCats(res.data);
            });
        }catch(error){
            console.log(error);
        }

        //Fetch current course data
        try{
            axios.get(baseUrl+'/teacher-courses-detail/'+course_id)
            .then((res)=>{
                setCourseData({
                    category:res.data.category,
                    title:res.data.title,
                    description:res.data.description,
                    prev_img:res.data.featured_img,
                    f_img:'',
                    techs:res.data.techs,
                });
            });
        }catch(error){
            console.log(error);
        }
        //End

    },[]);   

    //console.log(cats);

    const handleChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }

    const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('category',courseData.category);
        _formData.append('teacher',2);
        _formData.append('title',courseData.title);
        _formData.append('description',courseData.description);
        if(courseData.f_img!==''){
            _formData.append('featured_img',courseData.f_img,courseData.f_img.name);
        }
        _formData.append('techs',courseData.techs);

        try{
            axios.put(baseUrl+'/teacher-courses-detail/'+course_id,_formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200){
                    Swal.fire({
                        title: 'Data has been updated',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                }
            });
        }catch(error){
            console.log(error);
        }   
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>  
                <div className='col-9'>
                    <div className="card">
                        <h5 className="card-header">Edit Course</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Category</label>
                                    <select name='category' value={courseData.category} onChange={handleChange} class="form-control">
                                        {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}
                                        </option>})}  
                                    </select> 
                                </div>   
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input type="text" value={courseData.title} onChange={handleChange} id="title" name="title" className="form-control" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Description</label>
                                    <textarea onChange={handleChange} value={courseData.description} className="form-control" id="description" name="description"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="video" className="form-label">Featured Image</label>
                                    <input type="file" onChange={handleFileChange} name="f_img" id="video" className="form-control"/>
                                    {courseData.prev_img &&
                                        <p className="mt-2"><img src={courseData.prev_img} width="300" alt={courseData.title} /></p>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label for="techs" className="form-label">Technologies</label>
                                    <textarea value={courseData.techs} onChange={handleChange} name="techs" className="form-control" placeholder="Php, Python, Javascript, HTML, CSS" 
                                    id="techs"></textarea>
                                </div>
                                <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>         
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default EditCourse;