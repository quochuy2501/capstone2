import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/student/';

function Register(){
    const navigate=useNavigate();
    const [studentData, setstudentData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interested_categories':'',
        'status':'',
        'otp_digit':'',
    });

    const [studentErrorData, setstudentErrorData]=useState({
        'full_name':true,
        'email':true,
        'password':true,
        'username':true,
        'interested_categories':true,
    });

    // Change Element value
    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }
    // End  

    //Submit Form
    const submitForm=()=>{
        const otp_digit=Math.floor(100000 + Math.random() * 900000)
        const studentFormData=new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append( "email", studentData.email)
        studentFormData.append("password", studentData.password)
        studentFormData.append("username", studentData.username)
        studentFormData.append("interested_categories", studentData.interested_categories)
        studentFormData.append("otp_digit", otp_digit)

        try{
            axios.post(baseUrl,studentFormData).then((response)=>{
                console.log(response.data);
                navigate('/verify-student/'+response.data.id);
        }).catch(function(error){
            setstudentErrorData({
                'full_name':error.response.data.full_name,
                'email':error.response.data.email[0],
                'username':error.response.data.username,
                'password':error.response.data.password,
                'interested_categories':error.response.data.interested_categories,
            });
            console.log(studentErrorData);
        });
        }catch(error){
            console.log(error);
        } 
    };
    //End

    useEffect(()=>{
        document.title="Student Register"
    });   

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {studentData.status=='success' && <p class="text-success">Thanks for your registration</p>}
                    {studentData.status=='error' && <p class="text-danger">Something wrong happened!!</p>}
                    <div className="card">
                        <h5 className="card-header">User Register</h5>
                        <div className="card-body">
                            {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Full Name</label>
                                    <input value={studentData.full_name} type="text" name="full_name" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input value={studentData.email} type="email" name="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Username</label>
                                    <input value={studentData.username} type="text" name="username" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input value={studentData.password} type="password" name="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Interests</label>
                                    <textarea value={studentData.interested_categories} onChange={handleChange} name="interested_categories" className="form-control"></textarea>
                                    <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc</div>
                                </div>
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Register</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;