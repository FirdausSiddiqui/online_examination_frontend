import React, { useEffect, useState } from 'react';
import { SectionContent } from '../../../../components/Section';
import { connect, useDispatch } from 'react-redux';
import styles from '../takeexam.module.css';
import { currentExamQuestions } from '../../../../selectors/currentExam';
import { currentUser } from '../../../../selectors/appData';
import { Button } from 'react-bootstrap';
import axios from '../../../../axios';
import { GET_CURRENT_EXAM } from '../../../../actions';

let markedAnswers = [];
const QuestionSection = ({ currentExam }) => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answerIndex, setAnswerIndex] = useState();
  const [qIndex, setQIndex] = useState(0);
  const [qId, setQId] = useState(0);
  const updateIndex = (step) => {
    setQId(currentExam.questions[qIndex]._id);
    setQIndex(qIndex + step);
  };
  const onRadioChange = (e) => {
    console.log(e.target.value);

    setAnswerIndex(e.target.value);
  };
  useEffect(() => {
    let index = markedAnswers.findIndex(function (o) {
      return o.id === qId;
    });
    if (index !== -1) markedAnswers.splice(index, 1);

    markedAnswers.push({
      index: answerIndex,
      id: qId
    });
    console.log(markedAnswers, 'marked');
  }, [qIndex]);
  useEffect(() => {
    let index = markedAnswers.findIndex(function (o) {
      return o.index === undefined;
    });
    if (index !== -1) markedAnswers.splice(index, 1);
    console.log(answerIndex, 'answer');
  }, [answerIndex]);
  const submitAnswers = () => {
    setSubmitting(true);
    markedAnswers.push({
      index: answerIndex,
      id: qId
    });
    let finalAnswers = [];

    console.log(markedAnswers);
  };
  const checkMarkedOption = (optIndex) => {
    let markedIndex;
    console.log('yoboy');
    markedAnswers.map((item) => {
      console.log('yoboy2', markedIndex, optIndex);

      if (currentExam.questions[qIndex]._id == item.id) {
        console.log(markedIndex, item.index, optIndex, 'hahahpopa');
        markedIndex = item.index;
      }
    });
    return optIndex == markedIndex;
  };
  useEffect(() => {
    if (qIndex == currentExam.questions.length) {
      setFirstLoad(false);
    }
  }, [qIndex]);
  let filledArray = new Array(currentExam.questions.length).fill(0);
  return (
    <SectionContent className={styles.questionSection}>
      <div className={styles.eachQuestion}>
        <p>
          Q {qIndex + 1}. {currentExam.questions[qIndex].title}
        </p>
        {currentExam.questions[qIndex].options.map((opt, optIndex) => {
          return (
            <div>
              <input
                type="radio"
                id={optIndex}
                name="options"
                checked={firstLoad ? null : (optIndex) => checkMarkedOption()}
                value={optIndex + 1}
                onChange={onRadioChange}
              />
              <label for={opt}>{opt}</label>
              <br />
            </div>
          );
        })}
        <div>
          {qIndex != 0 && (
            <Button
              disabled={submitting}
              className={styles.button}
              variant="info"
              onClick={() => updateIndex(-1)}>
              Previous
            </Button>
          )}
          {qIndex != currentExam.questions.length - 1 && (
            <Button
              className={styles.button}
              variant="info"
              onClick={() => updateIndex(1)}
              disabled={submitting}>
              Next
            </Button>
          )}
          {qIndex == currentExam.questions.length - 1 && (
            <Button
              className={styles.button}
              variant="info"
              onClick={submitAnswers}>
              Submit
            </Button>
          )}
        </div>
      </div>
      <div className={styles.marksAndLegend}>
        <p>{currentExam.questions[qIndex].marks} Mark(s)</p>
        <div className={styles.legend}>
          {filledArray.map((item, index) => (
            <span
              onClick={submitting ? null : () => setQIndex(index)}
              className={
                submitting ? null : index == qIndex ? styles.selected : null
              }>
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </SectionContent>
  );
};

const mapStateToProps = (store, props) => ({
  questions: currentExamQuestions(store, props),
  userData: currentUser(store, props)
});

export default connect(mapStateToProps, null)(QuestionSection);
