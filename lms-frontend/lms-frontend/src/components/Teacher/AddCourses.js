import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Routes as Switch, Route } from 'react-router-dom';


function AddCourses() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-9'>
                    <div className="card">
                        <h5 className='card-header'>Add Course</h5>
                        <div className="card-body">
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                    <input type="text" id="title" className='form-control'/>
            
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <textarea  id="description" className='form-control'>
                                </textarea>
                            </div>
                            <div class="mb-3">
                                <label for="video" class="form-label">Course Video</label>
                                    <input type="file" className='form-control' id="video" />
                        
                            </div>
                            <div class="mb-3">
                                <label for="technologies" class="form-label">Technologies</label>
                                <textarea  type="form-control" id="technologies" className='form-control'>
                                </textarea>
                            </div>
                            
                            <hr />
                            <button className='btn btn-primary'>Submit</button>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
}

export default AddCourses;