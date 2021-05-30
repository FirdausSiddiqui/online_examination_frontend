import React from 'react';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.css';

const Login = () => {
  return (
    <div className="container">
      <Card
        title="For Teachers"
        content="Create your Exam and check the skills of the students"
        link="/teacherLogin"
        type="Login"
      />
      <Card
        title="For Students"
        content="Test your skill by giving exams. Lets signup here and start taking up exams"
        link="/studentLogin"
        type="Login"
      />
    </div>
  );
};

export default Login;
