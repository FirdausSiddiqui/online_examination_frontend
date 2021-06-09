import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import ExamCard from '../../components/ExamCard';
import axios from '../../axios';
import { sortByDate } from '../../helper';
import { GET_QUESTION_BANK } from '../../actions';

const QuestionBank = () => {
  const dispatch = useDispatch();
  const [questionPaperList, setQuestionPaperList] = useState([]);

  useEffect(() => {
    const getQuestionPapers = async () => {
      await axios
        .get('/questionBank')
        .then((res) => {
          setQuestionPaperList(sortByDate(res.data));
          dispatch({
            type: GET_QUESTION_BANK,
            payload: sortByDate(res.data)
          });
        })
        .catch((err) => console.log(err));
    };
    getQuestionPapers();
  }, []);

  useEffect(() => {
    console.log(questionPaperList);
  }, [questionPaperList]);
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={5}>
        {questionPaperList.map((paper, index) => {
          const { subjectCode, added, name } = paper;
          return (
            <ExamCard
              key={index}
              code={subjectCode}
              title={name ? name : 'Class Test'}
              added={added}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default QuestionBank;
