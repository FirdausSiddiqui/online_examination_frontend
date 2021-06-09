import { Container } from 'react-bootstrap';
import ExamGraph from '../../components/Graph/ExamGraph';
import { SectionContent } from '../../components/Section';

const ExamResult = () => {
  return (
    <SectionContent className="page">
      <header className="mb-4">
        <h2 className="mt-2">Exam Result Details</h2>
      </header>
      <main className="sectionBody">
        <Container className="mb-4">
          <h3>Mathematics - I (BS-M101)</h3>
          <h4>1st Internal</h4>
          <span>Taken on: 08.06.2021</span>
        </Container>
        <Container>
          <h4>Roll Wise Performance Graph</h4>
          <ExamGraph />
        </Container>
      </main>
    </SectionContent>
  );
};

export default ExamResult;
