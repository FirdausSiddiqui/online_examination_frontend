import styles from './uploadQuestion.module.css';
import { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import useQuestions from '../../hooks/useQuestions';
import AddQuestion from '../../components/AddQuestion';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { currentUser } from '../../selectors/appData';
import useAlert from '../../hooks/useAlert';

const UploadQuestion = ({ userData }) => {
  const history = useHistory();
  const { showAlert } = useAlert();
  const { teacherCode } = userData;
  const { questionList, addBlankQuestion, resetPaper } = useQuestions();
  const [paperName, setPaperName] = useState('');
  const [subCode, setSubCode] = useState('');
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const initialQuestionState = {
    title: '',
    options: ['', '', '', ''],
    correctIndex: null,
    marks: 1
  };
  const paperDetails = [
    {
      value: paperName,
      setter: setPaperName,
      label: 'Paper Name',
      id: 'paper-name',
      placeholder: 'Example: 1st Internal',
      type: 'string',
      multiple: false
    },
    {
      value: subCode,
      setter: setSubCode,
      label: 'Subject Code',
      id: 'sub-code',
      placeholder: 'Example: CS101A',
      type: 'string',
      multiple: false
    },
    {
      value: hours,
      setter: setHours,
      label: 'Hours and Minutes',
      id: 'paper-time',
      placeholder: '',
      placeholder2: '',
      value2: mins,
      setter2: setMins,
      type: 'number',
      type2: 'number',
      multiple: true
    }
  ];

  const submitQuestionPaper = async (e) => {
    e.preventDefault();
    axios
      .post('/questionBank', {
        subjectCode: subCode,
        name: paperName,
        questions: questionList,
        teacherCode,
        time: hours * 3600 + mins * 60
      })
      .then((response) => {
        showAlert({ message: 'Question uploaded successfully' });
        resetPaper();
        history.push('/auth/questionBank');
      })
      .catch((error) => {
        showAlert({ type: 'error', message: 'Some Error Occured' });
      });
  };
  return (
    <main className="page">
      <div className={`container ${styles.questionsContainer} mt-4`}>
        <h3 className="mt-4 mb-2">Question Paper Details</h3>
        <header className={`${styles.questionsHeader} mt-2 mb-2`}>
          {paperDetails.map((detail, index) => {
            const { id, label, setter, value, placeholder, multiple, type } =
              detail;
            return (
              <InputGroup
                key={index}
                className={`ml-4 ${styles.questionsHeaderInput}`}>
                <InputGroup.Prepend>
                  <InputGroup.Text id={id}>{label}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder={placeholder}
                  aria-label={label}
                  aria-describedby={id}
                  value={value}
                  onChange={
                    type === 'number'
                      ? (e) => setter(e.target.valueAsNumber)
                      : (e) => setter(e.target.value)
                  }
                  type={type}
                />
                {multiple && (
                  <FormControl
                    placeholder={detail.placeholder2}
                    aria-label={detail.label}
                    aria-describedby={id}
                    value={detail.value2}
                    onChange={
                      type === 'number'
                        ? (e) => detail.setter2(e.target.valueAsNumber)
                        : (e) => detail.setter2(e.target.value)
                    }
                    type={detail.type2}
                  />
                )}
              </InputGroup>
            );
          })}
        </header>
        <h3 className="mt-2">
          {questionList?.length === 0 ? 'Add Questions' : 'Questions Added:'}
        </h3>
        {questionList.map((question, index) => (
          <AddQuestion key={index} questionIndex={index} question={question} />
        ))}
        <Button
          variant="secondary"
          size="lg"
          block
          className="mt-4 mb-2"
          onClick={() => addBlankQuestion(initialQuestionState)}>
          Add Question
        </Button>
        {questionList.length >= 1 && (
          <Button
            type="submit"
            variant="info"
            className={`mt-4 mb-3 ${styles.submitBtn}`}
            disabled={
              subCode === '' ||
              teacherCode === '' ||
              (hours === 0 && mins === 0)
            }
            onClick={(e) => submitQuestionPaper(e)}>
            Submit Question Paper
          </Button>
        )}
      </div>
    </main>
  );
};

const mapStateToProps = (store, props) => ({
  userData: currentUser(store, props)
});
export default connect(mapStateToProps, null)(UploadQuestion);
