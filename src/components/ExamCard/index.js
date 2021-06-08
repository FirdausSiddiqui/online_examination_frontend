import styles from './examCard.module.css';
import { Button, Card } from 'react-bootstrap';
import cardImg from '../../assets/images/cpu.svg';
import cardImg2 from '../../assets/images/cpu-2.svg';
import addImg from '../../assets/images/add.svg';

const ExamCard = ({
  code,
  title,
  forNewExam,
  added,
  forSubject,
  setSubjectCode
}) => {
  const images = [cardImg, cardImg2];
  return (
    <Card bg="light" style={{ width: '15vw' }} className={styles.card}>
      <Card.Img
        variant="top"
        src={forNewExam ? addImg : images[Math.round(Math.random())]}
        className={styles.cardImg}
      />
      <Card.Body className={`${styles.cardBody} p-1 pt-3 pb-2`}>
        <Card.Title className={styles.cardTitle}>{code}</Card.Title>
        <Card.Subtitle className={styles.cardSubtitle}>
          {title}
          {!forNewExam && (
            <small className={styles.cardDate}> {added?.substr(0, 10)} </small>
          )}
        </Card.Subtitle>
      </Card.Body>
      {!forNewExam && (
        <Button
          size="sm"
          variant="info"
          className="mt-3"
          onClick={forSubject && (() => setSubjectCode(title))}>
          {forSubject ? 'Questions' : 'Details'}
        </Button>
      )}
    </Card>
  );
};

export default ExamCard;
