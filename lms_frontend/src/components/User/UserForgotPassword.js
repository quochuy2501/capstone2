import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function UserForgotPassword(){
    const navigate=useNavigate();
    const [studentData, setstudentData]=useState({
        email:'',
    });

    const [successMsg, setsuccessMsg]=useState('');
    const [errorMsg, seterrorMsg]=useState('');

    // Change Element value
    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('email',studentData.email)
        try{
            axios.post(baseUrl+'/user-forgot-password/',studentFormData)  
            .then((res)=>{
                if(res.data.bool==true){
                    setsuccessMsg(res.data.msg);    
                    seterrorMsg('');        
                }else{
                    seterrorMsg(res.data.msg);
                    setsuccessMsg(''); 
                }   
            });
        }catch(error){
            console.log(error);
        }   
        // console.log(teacherLoginData);
    }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus=='true'){
        window.location.href='/user-dashboard';
    }   

    useEffect(()=>{
        document.title='Student - Forgot Password';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter Your Registered Email</h5>
                        <div className="card-body">
                            {successMsg && <p className="text-success">{successMsg}</p>}
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" value={studentData.email} onChange={handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />                                    
                                </div>
                                <button type="submit" onClick={submitForm}  className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForgotPassword;