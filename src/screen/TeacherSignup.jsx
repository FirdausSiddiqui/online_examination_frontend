import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import teacher from '../images/teacher.jpg';
import { Link, useHistory } from 'react-router-dom';

const TeacherSignup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: ''
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, cpassword } = user;

    const res = await fetch('/teacherSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        cpassword
      })
    });
    const data = await res.json();
    if (!data) {
      console.log('invalid registration');
    } else {
      window.alert('registration successfull');
      history.push('/teacherLogin');
    }
  };

  return (
    <div className="container-sm p-5 shadow mt-5" style={{ width: '600px' }}>
      <div className="row">
        <div className="col-sm-6">
          <input
            type="text"
            name="fname"
            value={user.fname}
            onChange={handleInput}
            class="form-control"
            placeholder=" First Name"
          />
          <input
            type="text"
            name="lname"
            value={user.lname}
            onChange={handleInput}
            class="form-control"
            placeholder=" Last Name"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            class="form-control"
            placeholder=" email"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            class="form-control"
            placeholder=" Password"
          />
          <input
            type="password"
            name="cpassword"
            value={user.cpassword}
            onChange={handleInput}
            class="form-control"
            placeholder=" Comfirm Password"
          />
          <button
            type="button"
            class="btn btn-primary"
            onClick={postData}
            style={{ marginTop: '30px', marginLeft: '5px' }}>
            Sign Up
          </button>
        </div>
        <div className="col-sm-6 ">
          <img
            src={teacher}
            alt="teacher sitting with his laptop"
            className="pl-4 pt-2"
            style={{ width: '220px', height: '220px' }}
          />
          <Link
            to="/teacherLogin"
            className="pl-5 pt-1"
            style={{ display: 'block' }}>
            Login ? then click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignup;
