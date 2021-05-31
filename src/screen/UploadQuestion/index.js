import styles from './uploadQuestion.module.css';
import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useStore } from 'react-redux';
import useQuestions from '../../hooks/useQuestions';
import AddQuestion from '../../components/AddQuestion';

const UploadQuestion = () => {
  const store = useStore();
  const { questions } = store.getState().questionData;
  const { addBlankQuestion, updateQuestion, deleteQuestion } = useQuestions();
  const [subCode, setSubCode] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [semester, setSemester] = useState('');
  const initialQuestionState = {
    title: '',
    options: ['','','',''],
    correctIndex: null,
    marks: 1
  }
  const paperDetails = [
    {
      value: subCode,
      setter: setSubCode,
      label: "Subject Code",
      id: "sub-code",
      placeholder: "CS101A"
    },
    {
      value: semester,
      setter: setSemester,
      label: "Semester",
      id: "semester",
      placeholder: 1
    },
    {
      value: teacherCode,
      setter: setTeacherCode,
      label: "Teacher Code",
      id: "teacher-code",
      placeholder: "DC"
    }
  ];
  return (
    <main className = "page">
      <div className = {`container ${styles.questionsContainer} mt-4`}>
        <h3 className = "mt-4 mb-4">Question Paper Details</h3>
        <header className = {`${styles.questionsHeader} mt-3 mb-3`}>
          {paperDetails.map((detail, index) => {
            const {id, label, setter, value, placeholder} = detail
            return(
              <InputGroup key = {index} className = {`ml-4 ${styles.questionsHeaderInput}`}>
                <InputGroup.Prepend>
                  <InputGroup.Text id = {id}>{label}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder = {placeholder}
                  aria-label = {label}
                  aria-describedby = {id}
                  value = {value}
                  onChange = {(e) => setter(e.target.value)}
                  required
                />
              </InputGroup>
            );
          })}
        </header>
        <h3 className = "mt-4">{questions?.length === 0?"Add Questions":"Questions Added:"}</h3>
        {store.getState().questionData.questions.map((question, index) => 
          <AddQuestion 
            key = {index} 
            questionIndex = {index} 
            question = {question}
          />
        )}
        <Button variant = "secondary" size = "lg" block className = "mt-4 mb-4" onClick = {() => addBlankQuestion(initialQuestionState)}>
          Add Question
        </Button>
      </div>
    </main>
  )
}

export default UploadQuestion

