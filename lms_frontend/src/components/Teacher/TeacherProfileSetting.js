import TeacherSidebar from "./TeacherSidebar";
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function ProfileSetting(){
    
    const [teacherData, setteacherData]=useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status':'',
        'profile_img':'',
        'p_img':'',
        'facebook_url':'',
        'twitter_url':'',
        'instagram_url':'',
        'website_url':'',
        'login_via_otp':'',
    });

    const teacherId=localStorage.getItem('teacherId');
    //Fetch categories when page load
    useEffect(()=>{
        //Fetch current teacher data
        try{
            axios.get(baseUrl+'/teacher/'+teacherId)
            .then((res)=>{
                setteacherData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    qualification:res.data.qualification,
                    mobile_no:res.data.mobile_no,
                    skills:res.data.skills,
                    profile_img:res.data.profile_img,
                    p_img:'',
                    facebook_url:res.data.facebook_url,
                    twitter_url:res.data.twitter_url,
                    instagram_url:res.data.instagram_url,
                    website_url:res.data.website_url,
                    login_via_otp:res.data.login_via_otp,
                });
            });
        }catch(error){
            console.log(error);
        }
        //End

    },[]);  

    // Change Element value
    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }
    // End   

    const handleFileChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.files[0]
        });
    }

    //Submit Form
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append( "email", teacherData.email)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("facebook_url", teacherData.facebook_url)
        teacherFormData.append("twitter_url", teacherData.twitter_url)
        teacherFormData.append("instagram_url", teacherData.instagram_url)
        teacherFormData.append("website_url", teacherData.website_url)
        teacherFormData.append("skills", teacherData.skills)
        teacherFormData.append("login_via_otp", teacherData.login_via_otp)

        if(teacherData.p_img!==''){
            teacherFormData.append('profile_img',teacherData.p_img,teacherData.p_img.name);
        }

        try{
            axios.put(baseUrl+'/teacher/'+teacherId+'/',teacherFormData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response)=>{
                if(response.status==200){
                    Swal.fire({
                        title: 'Data has been updated',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                }
            });
        }catch(error){
            console.log(error);
            setteacherData({'status':'error'});
        }
    };
    //End

    useEffect(()=>{
        document.title="Teacher Profile"
    });   

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!='true'){
        window.location.href='/teacher-login';
    }  

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Full Name</label>
                                <div class="col-sm-10">
                                <input type="text" name="full_name" value={teacherData.full_name} onChange={handleChange} class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input type="email" name="email" value={teacherData.email} onChange={handleChange} class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="video" class="col-sm-2 col-form-label">Profile Image</label>
                                <div class="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="p_img" id="video" className="form-control"/>
                                    {teacherData.profile_img &&
                                        <p className="mt-2"><img src={teacherData.profile_img} width="300" alt={teacherData.full_name} /></p>
                                    }
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="exampleInputEmail1" className="col-sm-2 col-form-label">Skills</label>
                                <div class="col-sm-10">
                                    <textarea name="skills" className="form-control" value={teacherData.skills} onChange={handleChange}></textarea>
                                    <div id="emailHelp" className="form-text">Php, Python, JavaScript, etc</div>
                                </div>         
                            </div>
                            <div class="mb-3 row">
                                <label for="exampleInputEmail1" className="col-sm-2 col-form-label">Qualification</label>
                                <div class="col-sm-10">
                                    <textarea name="qualification" value={teacherData.qualification} onChange={handleChange} className="form-control"></textarea>
                                    <div id="emailHelp" className="form-text">BCA | MCA</div>
                                </div>         
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Login Via OTP</label>
                                <div class="col-sm-10">
                                <input type="text" name="login_via_otp" value={teacherData.login_via_otp} onChange={handleChange} class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <hr />
                            <h4 className="my-4">Social Accounts</h4>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Facebook</label>
                                <div class="col-sm-10">
                                <input type="text" name="facebook_url" value={teacherData.facebook_url} onChange={handleChange} class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Twitter</label>
                                <div class="col-sm-10">
                                <input type="text" name="twitter_url" value={teacherData.twitter_url} onChange={handleChange} class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Instagram</label>
                                <div class="col-sm-10">
                                <input type="text" name="instagram_url" value={teacherData.instagram_url} onChange={handleChange} class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Website</label>
                                <div class="col-sm-10">
                                <input type="text" name="website_url" value={teacherData.website_url} onChange={handleChange} class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={submitForm}>Update</button>
                        </div>
                    </div>                
                </section>
            </div>
        </div>
    );
}

export default ProfileSetting;