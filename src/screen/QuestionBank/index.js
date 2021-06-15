import { useEffect, useMemo, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ExamCard from '../../components/ExamCard';
import axios from '../../axios';
import LoaderContainer from '../../components/Loader';
import { connect, useDispatch } from 'react-redux';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { SET_CURRENT_QUESTION } from '../../actions';

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
          setQuestionList(res.data);
          console.log(res.data);
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
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            xl={5}
            className={isMobile && 'row-center'}>
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
                    setSubjectName={setSubjectName}
                    index={index}
                  />
                );
              })}
            {subjectCode !== '' &&
              questionList.map((question, index) => {
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
        </Container>
      )}
    </main>
  );
};

const mapStateToProps = (store, props) => ({
  userData: store.appData.user
});

export default connect(mapStateToProps, null)(QuestionBank);
