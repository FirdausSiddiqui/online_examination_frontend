import React, { useState } from 'react';
import { SectionContent } from '../../../../components/Section';
import { connect, useDispatch } from 'react-redux';
import styles from '../takeexam.module.css';
import { currentExamQuestions } from '../../../../selectors/currentExam';
import { currentUser } from '../../../../selectors/appData';
import { Button } from 'react-bootstrap';
import axios from '../../../../axios';
import LoaderContainer from '../../../../components/Loader';
import Icon from '../../../../components/Icon';
import { UPDATE_CURRENT_EXAM_MARKS } from '../../../../actions';

let markedAnswers = [];
const QuestionSection = ({ userData, currentExam }) => {
  const { questions, _id } = currentExam;
  const [submitting, setSubmitting] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const dispatch = useDispatch();

  const updateIndex = (step) => {
    setQIndex(qIndex + step);
  };

  const onRadioChange = (e) => {
    if (markedAnswers[qIndex]?.id != currentExam?.questions[qIndex]._id) {
      markedAnswers.push({
        index: qIndex,
        answerIndex: e.target.value,
        id: currentExam?.questions[qIndex]._id
      });
    } else {
      let currQuestion = markedAnswers[qIndex];
      let updatedQuestion = { ...currQuestion, answerIndex: e.target.value };
      markedAnswers[qIndex] = updatedQuestion;
    }
  };

  const updateMarks = async (mark) => {
    console.log(mark, _id);
    await axios
      .put(`/currentexam/${_id}`, {
        roll: userData.roll,
        name: userData.name,
        mark
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: UPDATE_CURRENT_EXAM_MARKS,
          payload: { name: userData.name, roll: userData.roll, mark }
        });
        setQIndex(0);
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err.message);
        setSubmitting(false);
      });
  };

  const calculateMarksAndSubmit = () => {
    let i = 0;
    let percentage = 0;
    let marks = 0;
    let totalMarks = 0;
    for (i = 0; i < markedAnswers.length; i++) {
      let questionIndex = questions.findIndex(
        (question) => question._id == markedAnswers[i].id
      );
      totalMarks = totalMarks + questions[questionIndex]?.marks;

      if (
        questions[questionIndex].correctIndex == markedAnswers[i].answerIndex
      ) {
        console.log(`Answer ${i + 1} correct`);
        marks = marks + 1;
      } else {
        console.log(`Answer ${i + 1} wrong`);
      }
      if (i === markedAnswers.length - 1)
        percentage = (marks / totalMarks) * 100;
    }
    if (i === markedAnswers.length) updateMarks(percentage);
  };

  const submitAnswers = () => {
    setSubmitting(true);
    calculateMarksAndSubmit();
  };
  let filledArray = new Array(questions.length).fill(0);
  const checkCorrectOption = (optIndex) => {
    if (optIndex + 1 == markedAnswers[qIndex].answerIndex) {
      if (questions[qIndex].correctIndex - 1 == optIndex) {
        return (
          <Icon name="fas fa-check-circle" className={styles.successIcon} />
        );
      } else {
        return <Icon name="fas fa-times" className={styles.wrongIcon} />;
      }
    } else {
      if (optIndex + 1 == questions[qIndex].correctIndex) {
        return (
          <Icon name="fas fa-check-circle" className={styles.successIcon} />
        );
      } else return <span>&nbsp;&nbsp;</span>;
    }
  };
  return (
    <>
      {submitting && <LoaderContainer text="Submitting..." />}
      {!submitting && (
        <SectionContent className={styles.questionSection}>
          <div className={styles.eachQuestion}>
            <p>
              Q {qIndex + 1}. {questions[qIndex].title}
            </p>
            {questions[qIndex].options.map((opt, optIndex) => {
              return (
                <div key={optIndex}>
                  {!currentExam.examTaken ? (
                    <input
                      key={qIndex}
                      type="radio"
                      id={optIndex}
                      name="options"
                      checked={
                        markedAnswers[qIndex]?.answerIndex == optIndex + 1 ||
                        null
                      }
                      value={optIndex + 1}
                      onChange={onRadioChange}
                    />
                  ) : (
                    checkCorrectOption(optIndex)
                  )}
                  <label htmlFor={opt}>{opt}</label>
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
              {qIndex != questions.length - 1 && (
                <Button
                  className={styles.button}
                  variant="info"
                  onClick={() => updateIndex(1)}
                  disabled={submitting}>
                  Next
                </Button>
              )}
              {qIndex == questions.length - 1 && !currentExam.examTaken && (
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
            <p>{questions[qIndex].marks} Mark(s)</p>
            <div className={styles.legend}>
              {filledArray.map((item, index) => (
                <span
                  key={index}
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
      )}
    </>
  );
};

const mapStateToProps = (store, props) => ({
  questions: currentExamQuestions(store, props),
  userData: currentUser(store, props)
});

export default connect(mapStateToProps, null)(QuestionSection);
