import React from 'react';
import ParticleAnimation from '../../components/ParticleAnimation';
import { getDate, getDay, getMonth } from '../../helper';
import styles from './dashboard.module.css';

const StudentDashboard = ({ userData }) => {
  const dateObj = new Date();
  const date = getDate(dateObj);
  const month = getMonth(dateObj);
  const day = getDay(dateObj);
  const notice = [
    {
      title: 'Revised schedule of Even Semester 2020-21',
      date: date + month
    },
    {
      title: 'Project Report Submission for Final Year Details',
      date: date + month
    },
    {
      title: 'MAR Documents Submission for Final Year Students',
      date: date + month
    },
    {
      title: '2nd Internal Examination Routine for AY 2020-21',
      date: date + month
    },
    {
      title: 'Project Report Format for Final Year Students',
      date: date + month
    },
    {
      title: 'Project Report Submission Date for Final Year Students',
      date: date + month
    },
    {
      title: 'Revised schedule of Even Semester 2020-21',
      date: date + month
    },
    {
      title: 'Project Report Submission for Final Year Details',
      date: date + month
    },
    {
      title: 'MAR Documents Submission for Final Year Students',
      date: date + month
    },
    {
      title: 'Project Report Submission Date for Final Year Students',
      date: date + month
    },
    {
      title: '1st Internal Examination Routine for AY 2020-21',
      date: date + month
    }
  ];
  return (
    <>
      <ParticleAnimation
        canvasClassName={styles.canvas}
        params={{
          particles: {
            number: {
              value: 150
            },
            size: {
              value: 3
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              }
            }
          }
        }}
      />
      <div className={styles.homeContent}>
        <div className={styles.headerAndDate}>
          <h1 className={styles.homeHeading}>Welcome, {userData?.name}!</h1>
          <div className={styles.homeDateContainer}>
            <p className={styles.homeMonth}>{month}</p>
            <p className={styles.homeDay}>{day}</p>
            <p className={styles.homeDate}>{date}</p>
          </div>
        </div>
        {userData.type !== 'admin' && (
          <div className={styles.updateContainer}>
            <h1>Notice</h1>
            <div className={styles.noticeDetails}>
              {notice.map((item, index) => {
                return (
                  <span key={index} className={styles.noticeItem}>
                    {item.title}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentDashboard;
