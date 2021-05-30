import React from 'react';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.css';

const Registration = () => {
  return (
    <div className="container">
      <Card
        title="For Teachers"
        content="Create your Exam and check the skills of the students"
        link="/teacherSignup"
        type="Sign Up"
      />
      <Card
        title="For Students"
        content="Test your skill by giving exams. Lets signup here and start taking up exams"
        link="/studentSignup"
        type="Sign Up"
      />
    </div>
  );
};

export default Registration;
