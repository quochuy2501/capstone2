import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function QuizQuestions(){ 
    const [questionData,setquestionData]=useState([]);   
    const [totalResult,setTotalResult]=useState(0); 
    const {quiz_id}=useParams();

    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
            .then((res)=>{
                setTotalResult(res.data.length);
                setquestionData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]); 

    //Delete Data
    const handleDeleteClick = (question_id) =>{
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/question/'+question_id)
                    .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
                            .then((res)=>{
                                setTotalResult(res.data.length);
                                setquestionData(res.data);
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

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>      
                <section className='col-md-9'>
                    <div className='card'>
                            <h5 className='card-header'>All Questions ({totalResult}) <Link className="btn btn-success btn-sm float-end" to={`/add-chapter/`+quiz_id}>Add Question</Link></h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Question</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questionData.map((row,index) => 
                                        <tr>
                                            <td><Link to={`/edit-question/`+row.id}>{row.questions}</Link></td>
                                            <td>
                                                <Link to={`/edit-question/`+row.id} className='btn btn-sm text-white btn-info'>
                                                    <i class="bi bi-pencil-square"></i></Link>
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

export default QuizQuestions;  