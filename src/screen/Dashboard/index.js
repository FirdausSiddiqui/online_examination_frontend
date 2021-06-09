import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SectionContent } from '../../components/Section';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

const Dashboard = ({ userData }) => {
  useEffect(() => {
    //api for fetching details of student, admin or teacher
  }, []);

  return (
    <SectionContent>
      {userData.type === 'student' ? (
        <StudentDashboard userData={userData} />
      ) : (
        <TeacherDashboard userData={userData} />
      )}
    </SectionContent>
  );
};

const mapStateToProps = (store, props) => ({
  userData: store.appData.user
});

export default connect(mapStateToProps, null)(Dashboard);
