import styles from './addQuestion.module.css';
import { useEffect, useState } from 'react';
import { Alert, Button, FormControl, InputGroup } from 'react-bootstrap';
import { Edit, Delete, CheckCircle, Close } from '@material-ui/icons';
import useQuestions from '../../hooks/useQuestions';

const AddQuestion = ({ question, questionIndex }) => {
  const { updateQuestion, deleteQuestion } = useQuestions();
  const [questionItem, setQuestionItem] = useState({
    title: '',
    options: ['', '', '', ''],
    correctIndex: null,
    marks: 1
  });
  const [saveMode, setSaveMode] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const ansOptions = ['A', 'B', 'C', 'D'];
  useEffect(() => {
    setQuestionItem(question);
  }, []);

  const handleQuestionTitle = (title) => {
    setQuestionItem({
      ...questionItem,
      title
    });
  };

  const handleOptionsChange = (value, index) => {
    let newOptions = [...questionItem.options];
    newOptions[index] = value;
    setQuestionItem({
      ...questionItem,
      options: newOptions
    });
  };

  const handleCorrectOption = (index) => {
    setQuestionItem({
      ...questionItem,
      correctIndex: index
    });
  };

  const handleQuestionMarks = (marks) => {
    setQuestionItem({
      ...questionItem,
      marks
    });
  };
  const handleUpdateQuestion = (e) => {
    e.preventDefault();
    updateQuestion(questionItem, questionIndex);
    setEditMode(false);
    setSaveMode(true);
  };

  const handleEditQuestion = (e) => {
    e.preventDefault();
    setSaveMode(false);
    setEditMode(true);
  };

  const handleDeleteQuestion = (e) => {
    e.preventDefault();
    deleteQuestion(questionIndex);
  };
  return (
    <section>
      {!editMode && saveMode && (
        <article className={`${styles.questionSaved} mb-2 mt-2`}>
          <span className={`${styles.questionSavedNumber}`}>
            {questionIndex + 1}
          </span>
          <span className={`${styles.questionSavedTitle} ml-3`}>
            {question?.title}
          </span>
          <nav className={`${styles.questionSavedBtns}`}>
            <Button variant="dark">
              <Edit onClick={(e) => handleEditQuestion(e)} />
            </Button>
            <Button variant="danger" className="ml-2">
              <Delete onClick={(e) => handleDeleteQuestion(e)} />
            </Button>
          </nav>
        </article>
      )}
      {editMode && !saveMode && (
        <section className={`${styles.questionForm} mb-3 mt-3`}>
          <Button
            className={`btn ${styles.closeBtn}`}
            variant="dark"
            onClick={(e) => handleDeleteQuestion(e)}>
            <Close />
          </Button>
          <InputGroup className="mb-4">
            <InputGroup.Prepend>
              <InputGroup.Text>Your Question</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              aria-label="question"
              rows="3"
              value={questionItem?.title}
              onChange={(e) => handleQuestionTitle(e.target.value)}
            />
          </InputGroup>
          <section className={`${styles.questionFormMarks} mb-2`}>
            <Alert variant="info">
              Add Options and Mark the Correct Answer
            </Alert>
            <InputGroup className={`${styles.questionFormMarksInput}`}>
              <InputGroup.Prepend>
                <InputGroup.Text>Marks</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Marks"
                placeholder="1"
                onChange={(e) => handleQuestionMarks(e.target.value)}
                value={questionItem?.marks}
              />
            </InputGroup>
          </section>
          {ansOptions.map((option, index) => {
            return (
              <InputGroup className="mb-4" key={index}>
                <InputGroup.Prepend>
                  <Button
                    variant="success"
                    className={`${styles.optionBtn} ${
                      questionItem?.correctIndex === index &&
                      `${styles.correctOption}`
                    }`}
                    onClick={() => handleCorrectOption(index)}>
                    <CheckCircle />
                  </Button>
                  <InputGroup.Text>Option {option}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label={`option ${option}`}
                  placeholder={`Type Option ${option}...`}
                  onChange={(e) => handleOptionsChange(e.target.value, index)}
                  value={questionItem?.options[index]}
                />
              </InputGroup>
            );
          })}
          <Button
            variant="primary"
            className="mt-3 btn"
            size="lg"
            onClick={(e) => handleUpdateQuestion(e)}
            disabled={
              questionItem?.title === '' || questionItem?.correctIndex === null
            }>
            Confirm
          </Button>
        </section>
      )}
    </section>
  );
};

export default AddQuestion;
