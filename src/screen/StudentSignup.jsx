import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import teacher from '../images/1685.jpg';
import { Link } from 'react-router-dom';

const StudentSignup = () => {
  return (
    <div className="container-sm p-5 shadow mt-3" style={{ width: '600px' }}>
      <div className="row">
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control"
            placeholder=" First Name"
          />
          <input
            type="text"
            className="form-control"
            placeholder=" Last Name"
          />
          <input type="email" className="form-control" placeholder=" email" />
          <select className="form-control" placeholder="dept">
            <option selected>Choose your department</option>
            <option>...</option>
          </select>
          <select className="form-control" placeholder="dept">
            <option selected>Choose your year</option>
            <option>...</option>
          </select>
          <select className="form-control" placeholder="dept">
            <option selected>Choose your semester</option>
            <option>...</option>
          </select>
          <input
            type="password"
            className="form-control"
            placeholder=" Password"
          />
          <input
            type="password"
            className="form-control"
            placeholder=" Comfirm Password"
          />
          <Link
            to="/teacherDashboard"
            className="btn btn-primary"
            style={{ marginTop: '30px', marginLeft: '5px' }}>
            Sign Up
          </Link>
        </div>
        <div className="col-sm-6 ">
          <img
            src={teacher}
            alt="teacher sitting with his laptop"
            className="pl-2 "
            style={{ width: '270px', height: '350px' }}
          />
          <Link
            to="/studentLogin"
            className="pl-5 pt-1"
            style={{ display: 'block' }}>
            Login ? then click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
