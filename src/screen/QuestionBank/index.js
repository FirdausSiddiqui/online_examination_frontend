import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ExamCard from '../../components/ExamCard';
import axios from '../../axios';
import LoaderContainer from '../../components/Loader';
import { connect } from 'react-redux';

const QuestionBank = ({ userData }) => {
  const { type, dept, sem } = userData;
  const [subjectList, setSubjectList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [subjectCode, setSubjectCode] = useState('');
  const [loading, setLoading] = useState(false);

  const teacherParams = {
    type,
    tdept: dept
  };
  const studentParams = {
    type,
    dept,
    sem
  };
  useEffect(() => {
    const getQuestionPapers = async () => {
      await axios
        .get('/questionBank', {
          params: type === 'teacher' ? teacherParams : studentParams
        })
        .then((res) => {
          setSubjectList(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err.message));
    };
    const getSubjectQuestions = async () => {
      await axios
        .get(`/questionBank/${subjectCode}`)
        .then((res) => {
          setQuestionList(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err.message));
    };
    setLoading(true);
    if (subjectCode === '') {
      getQuestionPapers();
    } else {
      getSubjectQuestions();
    }
  }, [subjectCode]);
  return (
    <>
      {loading ? (
        <LoaderContainer specialColor="#25A2B8" />
      ) : (
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} xl={5}>
            {subjectCode === '' &&
              subjectList.map((subject, index) => {
                const { code, name } = subject;
                return (
                  <ExamCard
                    key={index}
                    code={name}
                    title={code}
                    forSubject={true}
                    setSubjectCode={setSubjectCode}
                  />
                );
              })}
            {subjectCode !== '' &&
              questionList.map((question, index) => {
                const { subjectCode, name } = question;
                return <ExamCard key={index} code={name} title={subjectCode} />;
              })}
          </Row>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (store, props) => ({
  userData: store.appData.user
});

export default connect(mapStateToProps, null)(QuestionBank);
