import { Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ExamCard from '../../components/ExamCard';
import styles from './dashboard.module.css';

const TeacherDashboard = () => {
  return (
    <main className={styles.dashboard}>
      <section className="mb-4">
        <h2>Welcome,</h2>
        <h1>Sreejit De.</h1>
      </section>
      <Container>
        <Row>
          <NavLink className="link" to="/auth/uploadQuestion">
            <ExamCard code="New Exam Paper" forNewExam={true} />
          </NavLink>
        </Row>
      </Container>
      <h4 className="mt-4">Previous Papers</h4>
      <Container >
        <Row xs={1} sm={2} md={3} lg={4} xl={5}>
          <ExamCard code="CS 802D" title="1st Internal" />
          <ExamCard code="CS 203" title="1st Internal" />
          <ExamCard code="CS 402" title="1st Internal" />
          <ExamCard code="CS 402" title="1st Internal" />
          <ExamCard code="CS 402" title="1st Internal" />
          <ExamCard code="CS 402" title="1st Internal" />
        </Row>
      </Container>
    </main>
  );
};

export default TeacherDashboard;
