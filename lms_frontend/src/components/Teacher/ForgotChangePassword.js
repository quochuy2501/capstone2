import { useEffect,useState } from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function ForgotChangePassword(){
    const [teacherData, setteacherData]=useState({
        password:'',
    });

    const {teacher_id}=useParams();

    const [successMsg, setsuccessMsg]=useState('');
    const [errorMsg, seterrorMsg]=useState('');

    // Change Element value
    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('password',teacherData.password)
        try{
            axios.post(baseUrl+'/teacher-change-password/'+teacher_id+'/',teacherFormData)  
            .then((res)=>{
                if(res.data.bool==true){
                    setsuccessMsg(res.data.msg);    
                    seterrorMsg('');        
                }else{
                    seterrorMsg(res.data.msg);
                    seterrorMsg(''); 
                }   
            });
        }catch(error){
            console.log(error);
        }   
        // console.log(teacherLoginData);
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus=='true'){
        window.location.href='/teacher-dashboard';
    }   

    useEffect(()=>{
        document.title='Teacher - Change Password';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter your password</h5>
                        <div className="card-body">
                            {successMsg && <p className="text-success">{successMsg}</p>}
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Password</label>
                                    <input type="password" value={teacherData.password} onChange={handleChange} name="password" className="form-control" />                                    
                                </div>
                                <button type="submit" onClick={submitForm}  className="btn btn-primary">Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotChangePassword;