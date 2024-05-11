import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function AddAssignment(){ 
    const [assignmentData, setassignmentData]=useState({
        title:'',
        detail:''
    });

    const handleChange=(event)=>{
        setassignmentData({
            ...assignmentData,
            [event.target.name]:event.target.value
        });
    }

    const {teacher_id}=useParams();
    const {student_id}=useParams();

    const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('teacher',teacher_id);
        _formData.append('title',assignmentData.title);
        _formData.append('detail',assignmentData.detail);
        _formData.append('student',student_id);

        try{
            axios.post(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id,_formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200||res.status==201){
                    Swal.fire({
                        title: 'Assignment has been added',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                    // Save Notification Data
                    const _notifData=new FormData();
                    _notifData.append('teacher',teacher_id);
                    _notifData.append('notif_subject','assignment');
                    _notifData.append('notif_for','student');
                    _notifData.append('student',student_id);
                    axios.post(baseUrl+'/save-notification/', _notifData,{
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then((res)=>{
                        console.log('Notification Added');
                    })
                    // End Notification
                    window.location.reload();               
                }
                //End SweetAlert
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
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input type="text" onChange={handleChange} name="title" id="title" className="form-control" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="detail" className="form-label">Detail</label>
                                    <textarea className="form-control" onChange={handleChange} name="detail" id="detail"></textarea>
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

export default AddAssignment;