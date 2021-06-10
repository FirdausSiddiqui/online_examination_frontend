import React, { useEffect, useState } from 'react';
import { SectionContent } from '../../../../components/Section';
import { connect, useDispatch } from 'react-redux';
import styles from '../takeexam.module.css';
import { currentExamQuestions } from '../../../../selectors/currentExam';
import { currentUser } from '../../../../selectors/appData';
import { Button } from 'react-bootstrap';
import axios from '../../../../axios';
import { GET_CURRENT_EXAM } from '../../../../actions';
import LoaderContainer from '../../../../components/Loader';

let markedAnswers = [];
const QuestionSection = ({ currentExam }) => {
  const dispatch = useDispatch();
  const { questions, _id } = currentExam;
  const [firstLoad, setFirstLoad] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const updateIndex = (step) => {
    if(qIndex === markedAnswers.length){
      setAnswerIndex(null);
      markedAnswers.push({
        index: qIndex,
        answerIndex,
        id: currentExam?.questions[qIndex]._id
      });
    }else if(qIndex < markedAnswers.length && step !== -1){
      setAnswerIndex(markedAnswers[qIndex]?.answerIndex);
      let currQuestion = markedAnswers[qIndex];
      let updatedQuestion = {...currQuestion, answerIndex };
      markedAnswers[qIndex] = updatedQuestion;
    }
    setQIndex(qIndex + step);
  };
  const onRadioChange = (e) => {
    setAnswerIndex(e.target.value);
  };

  const updateMarks = async (mark) => {
    await axios.put(`/currentexam?id=${_id}`, {
      roll: 1,
      name: 'Rohit Mondal',
      mark
    })
    .then((res) => {
      console.log(res.data);
      setSubmitting(false);
    })
    .catch((err) => {
      console.log(err.message);
      setSubmitting(false);
    });
  }
  
  const calculateMarksAndSubmit = () => {
    let i = 0;
    let percentage = 0;
    for(i = 0; i < markedAnswers.length; i ++){
      let questionIndex = questions.findIndex((question) => question._id == markedAnswers[i].id);
      if(questions[questionIndex].correctIndex == markedAnswers[i].answerIndex){
        console.log(`Answer ${i + 1} correct`);
        setMarks(marks + 1);
        setTotalMarks(totalMarks + questions[questionIndex]?.marks);
      }else{
        console.log(`Answer ${i + 1} wrong`);
      }
      if(i === markedAnswers.length - 1)
        percentage = (marks / totalMarks) * 100;
    }
    if(i === markedAnswers.length)
      updateMarks(percentage);
  }

  const submitAnswers = () => {
    setSubmitting(true);
    updateIndex(0);
    calculateMarksAndSubmit();
  };

  const checkMarkedOption = (optIndex) => {
    let markedIndex;
    console.log('yoboy');
    markedAnswers.map((item) => {
      console.log('yoboy2', markedIndex, optIndex);

      if (questions[qIndex]._id == item.id) {
        console.log(markedIndex, item.index, optIndex, 'hahahpopa');
        markedIndex = item.index;
      }
    });
    return optIndex == markedIndex;
  };
  useEffect(() => {
    if (qIndex == questions.length) {
      setFirstLoad(false);
    }
  }, [qIndex]);
  let filledArray = new Array(questions.length).fill(0);
  return (
    <>
    {submitting && <LoaderContainer text = "Submitting..."/>}
    {!submitting && <SectionContent className={styles.questionSection}>
      <div className={styles.eachQuestion}>
        <p>
          Q {qIndex + 1}. {questions[qIndex].title}
        </p>
        {questions[qIndex].options.map((opt, optIndex) => {
          return (
            <div 
              key={optIndex} 
            >
              <input
                type="radio"
                id={optIndex}
                name="options"
                checked={firstLoad ? null : (optIndex) => checkMarkedOption()}
                value={optIndex + 1}
                onChange={onRadioChange}
              />
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
          {qIndex == questions.length - 1 && (
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
    </SectionContent>}
    </>
  );
};

const mapStateToProps = (store, props) => ({
  questions: currentExamQuestions(store, props),
  userData: currentUser(store, props)
});

export default connect(mapStateToProps, null)(QuestionSection);
