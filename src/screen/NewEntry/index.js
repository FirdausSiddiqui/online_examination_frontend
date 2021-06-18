import { Card, CardDeck } from "react-bootstrap"
import { SectionContent } from "../../components/Section"
import studentImg from '../../assets/images/students.png';
import teacherImg from '../../assets/images/teacher.png';
import subjectImg from '../../assets/images/book.png';
import styles from './newentry.module.css';

const NewEntry = () => {
  const cardTypes = [
    {
      type: 'Student',
      img: studentImg
    },
    {
      type: 'Teacher',
      img: teacherImg
    },
    {
      type: 'Subject',
      img: subjectImg
    }
  ]
  return (
    <SectionContent className="page">
      <h2 className="mt-4">Choose the option you want to add:</h2>
      <CardDeck className="mt-5 mb-5">
        {cardTypes.map((card, index) => {
          const { type, img } = card;
          return(
            <Card key={index} style={{ width: '50vw'}} className={styles.additionCard}>
              <Card.Body>
                <Card.Img
                  src={img}
                  variant="top"
                  className={styles.additionCardImg}
                />
                <Card.Title className="mt-3 text-center">
                  {type}
                </Card.Title>
              </Card.Body>
            </Card>
          );
        })}
      </CardDeck>
    </SectionContent>
  )
}

export default NewEntry
