import styles from './questionBank.module.css';
import { useEffect, useMemo, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import ExamCard from '../../components/ExamCard';
import axios from '../../axios';
import LoaderContainer from '../../components/Loader';
import { connect, useDispatch } from 'react-redux';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { SET_CURRENT_QUESTION } from '../../actions';
import { sortByDate } from '../../helper';

const QuestionBank = ({ userData }) => {
  const { type, dept, sem } = userData;
  const dispatch = useDispatch();
  const [subjectList, setSubjectList] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [subjectCode, setSubjectCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { dimensions } = useWindowDimensions();
  const isMobile = useMemo(() => {
    return dimensions.width <= 800;
  }, [dimensions.width]);

  const setCurrentQuestion = (index) => {
    dispatch({
      type: SET_CURRENT_QUESTION,
      payload: { ...questionList[index], subjectName }
    });
  };
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
          setQuestionList(sortByDate(res.data));
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
    <main className="page">
      {loading ? (
        <LoaderContainer specialColor="#25A2B8" />
      ) : (
        <Container>
          {subjectCode === '' && (
            <Row
              xs={1}
              sm={1}
              md={2}
              lg={3}
              xl={4}
              className={isMobile && 'row-center'}>
              {subjectList.map((subject, index) => {
                const { code, name } = subject;
                return (
                  <ExamCard
                    key={index}
                    code={name}
                    title={code}
                    forSubject={true}
                    setSubjectCode={setSubjectCode}
                    setSubjectName={setSubjectName}
                    index={index}
                  />
                );
              })}
            </Row>
          )}
          {subjectCode !== '' && questionList.length > 0 && (
            <Row
              xs={1}
              sm={1}
              md={2}
              lg={3}
              xl={4}
              className={isMobile && 'row-center'}>
              {questionList.map((question, index) => {
                const { subjectCode, name, added } = question;
                return (
                  <ExamCard
                    key={index}
                    code={name}
                    title={subjectCode}
                    added={added}
                    index={index}
                    setCurrentQuestion={setCurrentQuestion}
                  />
                );
              })}
            </Row>
          )}
          {subjectCode !== '' && questionList.length === 0 && (
            <section className={styles.questionsNotFound}>
              <h2>Sorry, No Questions Found for this subject!</h2>
              <Button
                variant="primary"
                className="mt-5 mb-5"
                onClick={() => setSubjectCode('')}>
                Back to Subjects
              </Button>
            </section>
          )}
        </Container>
      )}
    </main>
  );
};

const mapStateToProps = (store, props) => ({
  userData: store.appData.user
});

export default connect(mapStateToProps, null)(QuestionBank);
