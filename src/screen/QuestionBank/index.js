import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import ExamCard from '../../components/ExamCard'
import axios from '../../axios';
import { sortByDate } from '../../helper';

const QuestionBank = () => {
  const [questionPaperList, setQuestionPaperList] = useState([]);

  useEffect(() => {
    const getQuestionPapers = async() => {
      await axios.get('/questionBank')
      .then((res) => {
        setQuestionPaperList(sortByDate(res.data));
        console.log(questionPaperList);
      })
      .catch((err) => console.log(err))
    };
    getQuestionPapers();
  },[]);
  return (
    <Container >
        <Row xs={1} sm={2} md={3} lg={4} xl={5}>
          {questionPaperList.map((paper, index) => {
            const { subjectCode, added, name } = paper;
            return(
              <ExamCard 
                key = {index}
                code = {subjectCode}
                title = {name?name:"Class Test"}
                added = {added}
              />
            );
          })}
        </Row>
      </Container>
  )
}

export default QuestionBank
