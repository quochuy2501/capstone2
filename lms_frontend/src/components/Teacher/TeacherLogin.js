import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function TeacherLogin(){
    const navigate=useNavigate();
    const [teacherLoginData, setteacherLoginData]=useState({
        email:'',
        password:''
    });

    const [errorMsg, seterrorMsg]=useState('');

    // Change Element value
    const handleChange=(event)=>{
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('email',teacherLoginData.email)
        teacherFormData.append('password',teacherLoginData.password)
        try{
            axios.post(baseUrl+'/teacher-login',teacherFormData)
            .then((res)=>{
                if(res.data.bool==true){
                    if(res.data.login_via_otp==true){
                        navigate('/verify-teacher/'+res.data.teacher_id);
                    }else{
                        localStorage.setItem('teacherLoginStatus',true);
                        localStorage.setItem('teacherId',res.data.teacher_id);
                        navigate('/teacher-dashboard');                
                    }                   
                }else{
                    seterrorMsg(res.data.msg);
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
        document.title='Teacher Login';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Teacher Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" value={teacherLoginData.email} onChange={handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={teacherLoginData.password} onChange={handleChange} name="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                {/* <div className="mb-3">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div> */}
                                <button type="submit" onClick={submitForm}  className="btn btn-primary">Login</button>
                                <p className="mt-3"><Link to="/teacher-forgot-password" className="text-danger">Forgot Password?</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;