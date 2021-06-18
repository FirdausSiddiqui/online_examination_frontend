import React from 'react';
import { getDate, getDay, getMonth } from '../../helper';
import styles from './dashboard.module.css';

const StudentDashboard = ({ userData }) => {
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
  return (
    <div className={styles.homeContent}>
      <div className={styles.headerAndDate}>
        <h1 className={styles.homeHeading}>Welcome {userData?.name}</h1>
        <div className={styles.homeDateContainer}>
          <p className={styles.homeMonth}>{month}</p>
          <p className={styles.homeDay}>{day}</p>
          <p className={styles.homeDate}>{date}</p>
        </div>
      </div>
      <div className={styles.updateContainer}>
        <h1>Notice</h1>
        <div className={styles.noticeDetails}>
          {notice.map((item, index) => {
            return <p key={index}>{item.title}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
