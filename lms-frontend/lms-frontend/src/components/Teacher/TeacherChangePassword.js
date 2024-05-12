import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Routes as Switch, Route } from 'react-router-dom';


function ChangePassword() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className='card-header'>Change Password</h5>
                        <div className="card-body">
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                                <div class="col-sm-10">
                                    <input type="password" readonly class="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <hr />
                            <button className='btn btn-primary'>Update</button>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
}

export default ChangePassword;