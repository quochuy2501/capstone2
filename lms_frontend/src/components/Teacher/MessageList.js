import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';
function MessageList(props){
    const [msgData,setmsgData]=useState([]);   
    // console.log(teacherId);
    // Fetch courses when page load
    useEffect(()=>{
        try{
            // axios.get(baseUrl+'/course')
            axios.get(baseUrl+'/get-messages/'+props.teacher_id+'/'+props.student_id)
            .then((res)=>{
                setmsgData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);  
    
    const fetchMsgs = () =>{
        try{
            axios.get(baseUrl+'/get-messages/'+props.teacher_id+'/'+props.student_id)
            .then((res)=>{
                setmsgData(res.data);
                const objDiv = document.getElementById("msgList");
                objDiv.scrollTop = objDiv.scrollHeight;
            });
        }catch(error){
            console.log(error);
        }  
    } 
    
    const msgList={
        height:'500px',
        overflow:'auto'
    }

    return (
        <>
        <p><span className='btn btn-sm btn-secondary' onClick={fetchMsgs} title='Refresh'><i class="bi bi-bootstrap-reboot"></i></span></p>
        <div style={msgList} id='msgList'>
            {msgData.map((row,index) =>            
                <div className='row mb-4'>       
                    {row.msg_from != 'teacher' &&
                        <div className='col-5'>
                            <div class="alert alert-primary mb-1">
                                {row.msg_text}
                            </div>
                            <small className='text-muted'>{row.msg_time}</small>
                        </div>
                    }  

                    {row.msg_from == 'teacher' &&
                        <div className='col-5 offset-7'>
                            <div class="alert alert-success mb-1">
                                {row.msg_text}
                            </div>
                            <small className='text-muted'>{row.msg_time}</small>
                        </div>
                    }                 
                </div>
            )}
        </div>
        </>
    );
}

export default MessageList;   