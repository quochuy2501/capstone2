import Sidebar from "./Sidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function ChangePassword(){
    const [studentData, setstudentData]=useState({
        'password':''
    });

    const studentId=localStorage.getItem('studentId');

    // Change Element value
    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }
    // End   

    //Submit Form
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append("password", studentData.password)

        try{
            axios.post(baseUrl+'/student/change-password/'+studentId+'/',studentFormData)
            .then((response)=>{
                if(response.status==200){
                    window.location.href='/user-logout';
                }else{
                    alert("Oops... Some error occured");
                }
            });
        }catch(error){
            console.log(error);
            setstudentData({'status':'error'});
        }
    };
    //End

    useEffect(()=>{
        document.title="Student Change Password"
    });   

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus!='true'){
        window.location.href='/teacher-login';
    }  

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                                <div class="col-sm-10">
                                <input type="text" name="password" value={studentData.password} onChange={handleChange} class="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <hr />
                            <button className="btn btn-primary" onClick={submitForm}>Update</button>
                        </div>
                    </div>                
                </section>
            </div>
        </div>
    );
}

export default ChangePassword;