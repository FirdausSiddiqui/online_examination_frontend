import React from 'react';
import exam from '../images/exam.jpg';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  return (
    <div className="container-fluid row p-3">
      <div className="col-sm-6 pt-5">
        <img
          src={exam}
          alt="examination mr-5"
          style={{ height: '100%', width: '110%' }}
        />
      </div>
      <div className="col-lg-6">
        <Card
          title="Test Spot"
          content="Bringing Teacher and Student together on the same platform."
          link="/contact"
          type="learn more"
        />
      </div>
    </div>
  );
};

export default Home;
