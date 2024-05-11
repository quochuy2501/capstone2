import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function StudyMaterials(){ 
    const [studyData,setstudyData]=useState([]);   
    const [totalResult,setTotalResult]=useState(0); 
    const {course_id}=useParams();

    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/study-materials/'+course_id)
            .then((res)=>{
                setTotalResult(res.data.length);
                setstudyData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]); 

    //Delete Data
    // const Swal = require('sweetalert2');
    const handleDeleteClick = (study_id) =>{
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/study-material/'+study_id)
                    .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/study-materials/'+course_id)
                            .then((res)=>{
                                setTotalResult(res.data.length);
                                setstudyData(res.data);
                            });
                        }catch(error){
                            console.log(error);
                        }
                    });            
                }catch(error){
                    Swal.fire('error','Data has not been deleted!!');
                }
            }else{
                Swal.fire('error','Data has not been deleted!!');
            }
        });  
    }

    const downloadFile = (file_url)=>{
        window.location.href=file_url;
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>      
                <section className='col-md-9'>
                    <div className='card'>
                            <h5 className='card-header'>All Study Materials ({totalResult}) <Link className="btn btn-success btn-sm float-end" to={`/add-study/`+course_id}>Add Study Material</Link></h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Upload</th>
                                            <th>Remarks</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studyData.map((row,index) => 
                                        <tr>
                                            <td>{row.title}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" onClick={()=>downloadFile(row.upload)}>Download File</button>
                                            </td>
                                            <td>{row.remarks}</td>
                                            <td>
                                                <button onClick={()=>handleDeleteClick(row.id)} className='btn btn-sm btn-danger ms-1'>
                                                    <i class="bi bi-trash"></i></button>                             
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
    )
}

export default StudyMaterials;  