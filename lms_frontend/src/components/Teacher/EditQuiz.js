import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function EditQuiz(){
    const [quizData, setquizData]=useState({
        title:'',
        detail:'',
    });

    const teacherId=localStorage.getItem('teacherId');
    const {quiz_id}=useParams();
    //Fetch categories when page load
    useEffect(()=>{  

        // Fetch current quiz data
        try{
            axios.get(baseUrl+'/teacher-quiz-detail/'+quiz_id)
            .then((res)=>{
                setquizData({
                    title:res.data.title,
                    detail:res.data.detail,
                });
            });
        }catch(error){
            console.log(error);
        }
        //End

    },[]);   

    const handleChange=(event)=>{
        setquizData({
            ...quizData,
            [event.target.name]:event.target.value
        });
    }

    const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('teacher',teacherId);
        _formData.append('title',quizData.title);
        _formData.append('detail',quizData.detail);

        try{
            axios.put(baseUrl+'/teacher-quiz-detail/'+quiz_id,_formData,{
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
                        <h5 className="card-header">Edit Quiz</h5>
                        <div className="card-body">
                            <form> 
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input type="text" value={quizData.title} onChange={handleChange} id="title" name="title" className="form-control" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="detail" className="form-label">Detail</label>
                                    <textarea onChange={handleChange} value={quizData.detail} className="form-control" id="detail" name="detail"></textarea>
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

export default EditQuiz;