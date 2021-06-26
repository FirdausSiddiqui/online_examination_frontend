import { Container } from 'react-bootstrap';
import ExamGraph from '../../components/Graph/ExamGraph';
import { SectionContent } from '../../components/Section';
import { useSelector } from 'react-redux';
import { currentQuestion } from '../../selectors/questionBank';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const ExamResult = () => {
  const history = useHistory();
  const { added, subjectName, name, subjectCode, marks } =
    useSelector(currentQuestion);
  useEffect(() => {
    if (!subjectName) {
      history.replace('/auth/questionBank');
    }
  }, []);
  return (
    <SectionContent className="page">
      <header className="mb-4">
        <h2 className="mt-2">Exam Result Details</h2>
      </header>
      <main className="sectionBody">
        <Container className="mb-4">
          <h3>
            {subjectName} ({subjectCode})
          </h3>
          <h4>{name}</h4>
          <span>Taken on: {added?.substr(0, 10)}</span>
        </Container>
        <Container>
          <h4>
            Roll Wise Performance Graph {''}{' '}
            {marks.length === 0 && 'Not Available'}
          </h4>
          {marks.length === 0 && (
            <h4 className="mt-4">Seems like no one has taken this test yet!</h4>
          )}
          {marks.length !== 0 && <ExamGraph examMarks={marks} />}
        </Container>
      </main>
    </SectionContent>
  );
};

export default ExamResult;
