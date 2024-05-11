import { useEffect,useState } from "react";
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function VerifyStudent(){
    const navigate=useNavigate();
    const [studentData, setstudentData]=useState({
        otp_digit:'',
    });

    const [errorMsg, seterrorMsg]=useState('');

    // Change Element value
    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    const {student_id}=useParams();

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append("otp_digit", studentData.otp_digit)
        try{
            axios.post(baseUrl+'/verify-student/'+student_id+'/',studentFormData)
            .then((res)=>{
                if(res.data.bool==true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',res.data.student_id);
                    navigate('/user-dashboard');
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
    if(studentLoginStatus=='true'){
        navigate('/user-dashboard');
    }   

    useEffect(()=>{
        document.title='Verify Student';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter 6 Digit OTP</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">OTP</label>
                                    <input type="number" value={studentData.otp_digit} onChange={handleChange} name="otp_digit" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />                                    
                                </div>
                                <button type="submit" onClick={submitForm}  className="btn btn-primary">Verify</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyStudent;