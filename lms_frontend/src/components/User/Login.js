import { useEffect,useState } from "react";
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function Login(){
    const navigate=useNavigate();
    const [studentLoginData, setstudentLoginData]=useState({
        email:'',
        password:''
    });

    const [errorMsg, seterrorMsg]=useState('');

    // Change Element value
    const handleChange=(event)=>{
        setstudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const StudentFormData=new FormData;
        StudentFormData.append('email',studentLoginData.email)
        StudentFormData.append('password',studentLoginData.password)
        try{
            axios.post(baseUrl+'/student-login',StudentFormData)
            .then((res)=>{
                if(res.data.bool==true){
                    if(res.data.login_via_otp==true){
                        navigate('/verify-student/'+res.data.student_id);
                    }else{
                        localStorage.setItem('teacherLoginStatus',true);
                        localStorage.setItem('teacherId',res.data.student_id);
                        navigate('/user-dashboard');                
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

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true'){
        window.location.href='/user-dashboard';
    }   

    useEffect(()=>{
        document.title='Student Login';
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" value={studentLoginData.email} onChange={handleChange} name="email" className="form-control" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={studentLoginData.password} onChange={handleChange} name="password" className="form-control" />
                                </div>
                                {/* <div className="mb-3">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div> */}
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                                <p className="mt-3"><Link to="/user-forgot-password" className="text-danger">Forgot Password?</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;