import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';

function MyTeachers(){

    const [teacherData,setteacherData]=useState([]); 
    const studentId=localStorage.getItem('studentId');

    // Fetch students when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/fetch-my-teachers/'+studentId)
            .then((res)=>{
                setteacherData(res.data);
            });
        }catch(error){
            console.log(error);
        }
        document.title="My Teachers";
    },[]);  

    // Send Message
    const [groupMsgData, setgroupMsgData]=useState({
        msg_text:'',
    });

    const [groupsuccessMsg, setgroupsuccessMsg]=useState('');
    const [grouperrorMsg, setgrouperrorMsg]=useState('');

    // Send Message
    const [msgData, setmsgData]=useState({
        msg_text:'',
    });

    const [successMsg, setsuccessMsg]=useState('');
    const [errorMsg, seterrorMsg]=useState('');

    const handleChange=(event)=>{
        setmsgData({
            ...msgData,
            [event.target.name]:event.target.value
        });
    }

    
    const formSubmit=(teacher_id)=>{
        const _formData=new FormData();
        _formData.append('msg_text',msgData.msg_text);
        _formData.append('msg_from','student');

        try{
            axios.post(baseUrl+'/send-message/'+teacher_id+'/'+studentId,_formData)
            .then((res)=>{
                if(res.data.bool===true){
                    setmsgData({
                        'msg_text':''
                    });
                    setsuccessMsg(res.data.msg);
                    seterrorMsg('');
                }else{
                    setsuccessMsg('');
                    seterrorMsg(res.data.msg);
                }
                //End SweetAlert
            });
        }catch(error){
            console.log(error);
        }   
    };
    // End Send Message

    const grouphandleChange=(event)=>{
        setgroupMsgData({
            ...groupMsgData,
            [event.target.name]:event.target.value
        });
    }

    // Group Send Message
    const groupformSubmit=(student_id)=>{
        const _formData=new FormData();
        _formData.append('msg_text',groupMsgData.msg_text);
        _formData.append('msg_from','student');

        try{
            axios.post(baseUrl+'/send-group-message-from-student/'+studentId,_formData)
            .then((res)=>{
                if(res.data.bool===true){
                    setgroupMsgData({
                        'msg_text':''
                    });
                    setgroupsuccessMsg(res.data.msg);
                    setgrouperrorMsg('');
                }else{
                    setgroupsuccessMsg('');
                    setgrouperrorMsg(res.data.msg);
                }
                //End SweetAlert
            });
        }catch(error){
            console.log(error);
        }   
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>      
                <section className='col-md-9'>
                    <div className='card'>
                            <h5 className='card-header'>My Teachers
                                <button type="button" className="btn btn-primary float-end btn-sm" data-bs-toggle="modal" data-bs-target="#groupMsgModal">
                                    Send Message
                                </button>
                            </h5>

                            {/* Modal */}
                            <div className="modal fade" id="groupMsgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Send Message to All Teachers</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            {groupsuccessMsg && <p className="text-success">{groupsuccessMsg}</p>}
                                            {grouperrorMsg && <p className="text-danger">{grouperrorMsg}</p>}
                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label">Message</label>
                                                    <textarea onChange={grouphandleChange} value={groupMsgData.msg_text} name="msg_text" className="form-control" rows="10"></textarea>
                                                </div>
                                                <button type="button" onClick={groupformSubmit} className="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teacherData.map((row,index) => 
                                            <tr>
                                                <td><Link to={`/teacher-detail/`+row.teacher.id}>{row.teacher.full_name}</Link></td>
                                                <td>
                                                    <button data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} className="btn btn-sm btn-dark mb-2" title="Send Message"><i className="bi bi-chat-fill"></i></button>

                                                    {/* Message Modal */}
                                                    <div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-fullscreen">
                                                        <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                <span className="text-danger">{row.teacher.full_name}</span>
                                                                {/* <span className="ms-5 btn btn-sm btn-secondary" title="Refresh"><i className="bi bi-bootstrap-reboot"></i></span> */}
                                                            </h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                                <div className="col-md-7 mb-2 col-12 border-end">  
                                                                    <MessageList teacher_id={row.teacher.id} student_id={studentId} />
                                                                </div>
                                                                <div className="col-md-4 col-12">
                                                                    {successMsg && <p className="text-success">{successMsg}</p>}
                                                                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                                                    <form>
                                                                        <div className="mb-3">
                                                                            <label for="exampleInputEmail1" className="form-label">Message</label>
                                                                            <textarea onChange={handleChange} value={msgData.msg_text} name="msg_text" className="form-control" rows="10"></textarea>
                                                                        </div>
                                                                        <button type="button" onClick={()=>formSubmit(row.teacher.id)} className="btn btn-primary">Submit</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary">Send</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
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
    );
}

export default MyTeachers;