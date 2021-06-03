import { SectionContent } from '../../components/Section';
import styles from './performance.module.css';
import performanceImg from '../../images/rising.svg';
import { Container } from 'react-bootstrap';
import Graph from '../../components/Graph.js';

const Performance = () => {
  return (
    <SectionContent className="page">
      <header className={`${styles.performanceHeader} mb-4`}>
        <h3>Keep Your Performances on Track!</h3>
        <img
          src={performanceImg}
          alt="Performance"
          className={styles.performanceHeaderImg}
        />
      </header>
      <Container>{/* The Exam Result Card Container */}</Container>
      <Container>
        <h4>Performance Graph</h4>
        <Graph />
      </Container>
    </SectionContent>
  );
};

export default Performance;
