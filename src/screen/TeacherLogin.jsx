import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import teacher from '../images/teacherLogin.jpg';
import Input from '../components/Input';
import axios from '../axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_USER_DETAILS } from '../actions';
import useAlert from '../hooks/useAlert';
import ActivityIndicator from '../components/ActivityIndicator';

const TeacherLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .post('/teacherLogin', {
        teacherCode: e.target.teacherCode.value,
        password: e.target.teacherPassword.value
      })
      .then((res) => {
        if (res.data.message === 'sign in successfully') {
          dispatch({
            type: SET_USER_DETAILS,
            payload: res.data.user
          });
          setLoading(false);
          showAlert({ type: 'success', message: res.data.message });
          history.push('/auth/dashboard');
        } else {
          setLoading(false);
          showAlert({ type: 'error', message: res.data.message });
        }
      })
      .catch((error) => {
        setLoading(false);
        showAlert({
          type: 'error',
          message: 'There was some error. Please try again later.'
        });
      });
  };
  return (
    <div className="container-sm p-5 shadow mt-5" style={{ width: '600px' }}>
      <div className="row">
        <div className="col-sm-6 pt-5">
          <form onSubmit={onSubmit}>
            <Input
              name="teacherCode"
              type="text"
              class="form-control"
              placeholder="Teacher Code"
              required
            />
            <Input
              name="teacherPassword"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
            <button
              disabled={loading}
              type="submit"
              class="btn btn-primary"
              style={{ marginTop: '30px', display: 'block' }}>
              {loading ? (
                <ActivityIndicator size="s" color="white" />
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
        <div className="col-sm-6 ">
          <img
            src={teacher}
            alt="teacher sitting with laptop"
            className=" "
            style={{ width: '250px', height: '200px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
