import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function UserStudyMaterials(){ 
    const [studyData,setstudyData]=useState([]);   
    const [totalResult,setTotalResult]=useState(0); 
    const {course_id}=useParams();

    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/user/study-materials/'+course_id)
            .then((res)=>{
                setTotalResult(res.data.length);
                setstudyData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]); 

    const downloadFile = (file_url)=>{
        window.location.href=file_url;
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>      
                <section className='col-md-9'>
                    <div className='card'>
                            <h5 className='card-header'>All Study Materials ({totalResult})</h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Detail</th>
                                            <th>Upload</th>
                                            <th>Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studyData.map((row,index) => 
                                        <tr>
                                            <td>{row.title}</td>
                                            <td>{row.description}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" onClick={()=>downloadFile(row.upload)}>Download File</button>
                                            </td>
                                            <td>{row.remarks}</td>
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

export default UserStudyMaterials;  