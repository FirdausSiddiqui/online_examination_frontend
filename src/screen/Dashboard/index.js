import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SectionContent } from '../../components/Section';
import { getDate, getDay, getMonth } from '../../helper';
import styles from './dashboard.module.css';
import TeacherDashboard from './TeacherDashboard';

const Dashboard = (props) => {
  const dateObj = new Date();
  const date = getDate(dateObj);
  const month = getMonth(dateObj);
  const day = getDay(dateObj);
  const notice = [
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    },
    {
      title: 'Abcd',
      date: date + month
    }
  ];
  useEffect(() => {
    //api for fetching details of student, admin or teacher
  }, []);

  return (
    <SectionContent>
      {props.userData.type == 'student' ? (
        <div className={styles.homeContent}>
          <div className={styles.headerAndDate}>
            <h1 className={styles.homeHeading}>
              Welcome {props.userData?.name}
            </h1>
            <div className={styles.homeDateContainer}>
              <p className={styles.homeMonth}>{month}</p>
              <p className={styles.homeDay}>{day}</p>
              <p className={styles.homeDate}>{date}</p>
            </div>
          </div>
          <div className={styles.updateContainer}>
            <h1>Notice</h1>
            <div className={styles.noticeDetails}>
              {notice.map((item) => {
                return <p>{item.title}</p>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <TeacherDashboard />
      )}
    </SectionContent>
  );
};

const mapStateToProps = (store, props) => {
  const userData = { name: 'Rohit', type: 'student' };
  return {
    userData
  };
};

export default connect(mapStateToProps, null)(Dashboard);
