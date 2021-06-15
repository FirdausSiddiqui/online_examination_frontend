import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import axios from '../../../axios';
import { Section, SectionContent } from '../../../components/Section';
import { currentExam } from '../../../selectors/currentExam';
import { addSuffix } from '../../../helper';
import styles from './takeexam.module.css';
import { currentUser } from '../../../selectors/appData';
import Timer from '../../../components/Timer';
import QuestionSection from './QuestionSection';
import Guidelines from './Guidelines';
import { GET_CURRENT_EXAM, ROUTE_CHANGE } from '../../../actions';

const TakeExam = ({ currentExam, userData }) => {
  const dispatch = useDispatch();
  const { sem, dept } = userData;
  const [index, setIndex] = useState(1);
  const updateIndex = (newIndex) => setIndex(newIndex);
  let today = new Date();
  let currentExamTime = currentExam?.examTaken ? 0 : currentExam?.time;
  today.setHours(today.getHours() + currentExamTime);
  const DEADLINE = new Date(today);

  useEffect(() => {
    const getCurrentQuestionPaper = async () => {
      await axios
        .get(`/currentexam?sem=${sem}&dept=${dept}`)
        .then((res) => {
          dispatch({
            type: GET_CURRENT_EXAM,
            payload: res.data
          });
        })
        .catch((err) => console.log(err));
    };
    if (!currentExam.examTaken) getCurrentQuestionPaper();
  }, []);
  useEffect(() => {
    if (index == 2) {
      detectRouteAndTabChange();
      //api to fetch current exam
    }
  }, [index]);

  const detectRouteAndTabChange = () => {
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ''; // Legacy method for cross browser support
      }
      return ''; // Legacy method for cross browser support
    };
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState == 'hidden') {
        dispatch({
          type: ROUTE_CHANGE
        });
        alert(
          'You changed tabs. This is the final warning. Changing tabs again will lead to cancellation of exam'
        );
      }
    });
  };
  const { subjectCode = '' } = currentExam || '';
  return (
    <Section>
      {index == 1 && !currentExam.examTaken ? (
        <Guidelines subjCode={subjectCode} updateIndex={updateIndex} />
      ) : (
        <>
          {!currentExam.examTaken && (
            <Prompt
              when={index == 2}
              message={(location) => {
                return `You shouldn't go to ${location.pathname}. Going to any other page will result in cancellation of your exam.`;
              }}
            />
          )}
          <SectionContent className={styles.studentDetails}>
            <div className={styles.details}>
              <p>{userData.name}</p>
              <p>
                {addSuffix(userData.sem)}&nbsp;sem,{' '}
                {addSuffix(Math.ceil(userData.sem / 2))}&nbsp;year
              </p>
              <p>Subject Code:&nbsp;{subjectCode}</p>
            </div>
            <div className={styles.timer}>
              <Timer destination={DEADLINE}>
                {({
                  days = '00',
                  hours = '00',
                  minutes = '00',
                  seconds = '00'
                }) => {
                  return (
                    <p className={styles.hrsminsec}>
                      Time left:&nbsp;{hours}:{minutes}:{seconds}
                    </p>
                  );
                }}
              </Timer>
            </div>
          </SectionContent>
          <QuestionSection currentExam={currentExam} />
        </>
      )}
    </Section>
  );
};

const mapStateToProps = (store, props) => ({
  currentExam: currentExam(store, props),
  userData: currentUser(store, props)
});

export default connect(mapStateToProps, null)(TakeExam);
