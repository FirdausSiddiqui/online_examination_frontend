import { Container, Row } from 'react-bootstrap';
import ExamCard from '../../components/ExamCard';
import styles from './dashboard.module.css';

const TeacherDashboard = () => {
  return (
    <main>
      <Container className={styles.container}>
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
