import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


function TeacherDetail() {
    let { course_id } = useParams();
    return (
    <div className="container mt-3">
        <div className="row">
            <div className="col-4">
                <img src="../logo512.png" className="img-thumbnail" alt="" />
            </div>
            <div className="col-8">
                <h3>Thinh Doan</h3>
                <p>Course Description</p>
                <p className="fw-bold">Skills: <Link to="/category/php">PHP</Link>, <Link to="/category/php">JavaScript</Link></p>
                <p className="fw-bold">Recent Course: <Link to="/category/php">ReactJS Course</Link></p>
                <p className="fw-bold">Rating: 4/5</p>
            </div>
        </div>

        {/*Course Video */}
        <div className="card mt-4">
            <h5 className="card-header">
                Course List
            </h5>
            <div className="list-group list-group-flush">
                <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 1</Link>
                <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 2</Link>
                <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 3</Link>
            </div>
        </div>
        </div>
        
        );
}
export default TeacherDetail;