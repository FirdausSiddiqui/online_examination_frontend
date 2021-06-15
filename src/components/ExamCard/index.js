import styles from './examCard.module.css';
import { Button, Card } from 'react-bootstrap';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import cardImg from '../../assets/images/cpu.svg';
import cardImg2 from '../../assets/images/cpu-2.svg';
import addImg from '../../assets/images/add.svg';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const ExamCard = ({
  code,
  title,
  forNewExam,
  added,
  forSubject,
  setSubjectCode,
  index,
  setSubjectName,
  setCurrentQuestion
}) => {
  const images = [cardImg, cardImg2];
  const { dimensions } = useWindowDimensions();
  const history = useHistory();
  const isMobile = useMemo(() => {
    return dimensions.width <= 800;
  }, [dimensions.width]);
  const setSubject = () => {
    setSubjectName(code);
    setSubjectCode(title);
  };
  const navigateToResult = () => {
    setCurrentQuestion(index);
    history.push('/auth/examresult');
  };
  return (
    <Card
      bg="light"
      style={{ width: isMobile ? '12vw' : '15vw' }}
      className={styles.card}>
      <Card.Img
        variant="top"
        src={forNewExam ? addImg : images[Math.round(Math.random())]}
        className={`${styles.cardImg} ${isMobile && styles.mobileCardImg}`}
      />
      <Card.Body className={`${styles.cardBody} p-1 pt-3 pb-2`}>
        <Card.Title
          className={`${styles.cardTitle} ${
            isMobile && styles.mobileCardTitle
          }`}>
          {code}
        </Card.Title>
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
          onClick={forSubject ? setSubject : navigateToResult}>
          {forSubject ? 'Questions' : 'Details'}
        </Button>
      )}
    </Card>
  );
};

export default ExamCard;
