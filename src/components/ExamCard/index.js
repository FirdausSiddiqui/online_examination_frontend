import styles from './examCard.module.css';
import { Card } from 'react-bootstrap';
import cardImg from '../../assets/images/cpu.svg';
import cardImg2 from '../../assets/images/cpu-2.svg';
import addImg from '../../assets/images/add.svg';

const ExamCard = ({ code, title, forNewExam }) => {
  const images = [cardImg, cardImg2];
  return (
    <Card style={{ width: '15vw' }} className={styles.card}>
      <Card.Img
        variant="top"
        src={forNewExam ? addImg : images[Math.round(Math.random())]}
        className={styles.cardImg}
      />
      <Card.Body>
        <Card.Title className={styles.cardTitle}>{code}</Card.Title>
        <Card.Subtitle>{title}</Card.Subtitle>
      </Card.Body>
      {!forNewExam && <small className={styles.cardDate}> 30.05.2021 </small>}
    </Card>
  );
};

export default ExamCard;
