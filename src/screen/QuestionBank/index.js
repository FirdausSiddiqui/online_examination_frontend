import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ExamCard from '../../components/ExamCard';
import axios from '../../axios';
import { sortByDate } from '../../helper';
import LoaderContainer from '../../components/Loader';

const QuestionBank = () => {
  const [questionPaperList, setQuestionPaperList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuestionPapers = async () => {
      await axios
        .get('/questionBank')
        .then((res) => {
          setQuestionPaperList(sortByDate(res.data));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    setLoading(true);
    getQuestionPapers();
  }, []);
  return (
    <>
      {loading ? (
        <LoaderContainer specialColor="#25A2B8" />
      ) : (
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
      )}
    </>
  );
};

export default QuestionBank;
