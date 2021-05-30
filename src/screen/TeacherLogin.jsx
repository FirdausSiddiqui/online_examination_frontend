import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import teacher from '../images/teacherLogin.jpg';
import { Link } from 'react-router-dom';

const TeacherLogin = () => {
  return (
    <div className="container-sm p-5 shadow mt-5" style={{ width: '600px' }}>
      <div className="row">
        <div className="col-sm-6 pt-5">
          <input type="email" class="form-control" placeholder=" email" />
          <input type="password" class="form-control" placeholder=" Password" />
          <Link
            to="/teacherLogin"
            class="btn btn-primary"
            style={{ marginTop: '30px', marginLeft: '5px' }}>
            Login
          </Link>
        </div>
        <div className="col-sm-6 ">
          <img
            src={teacher}
            alt="teacher sitting with his laptop"
            className=" "
            style={{ width: '250px', height: '200px' }}
          />
          <Link
            to="/teacherSignup"
            className="pl-5 pt-1"
            style={{ display: 'block' }}>
            Sign Up ? then click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
