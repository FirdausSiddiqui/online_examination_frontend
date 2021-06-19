import { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Row
} from 'react-bootstrap';
import FormInput from '../../components/FormInput';

const NewEntryForm = ({ type }) => {
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [roll, setRoll] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [bookDepts, setBookDepts] = useState([]);

  const inputFields = {
    Name: {
      label: 'name',
      onChange: setName,
      value: name,
      inputType: 'text'
    },
    Semester: {
      label: 'semester',
      onChange: setSemester,
      value: semester,
      inputType: 'number'
    },
    Roll: {
      label: 'roll',
      onChange: setRoll,
      value: roll,
      inputType: 'number'
    },
    Dept: {
      label: 'department',
      onChange: setDept,
      value: dept,
      inputType: 'dropdown'
    },
    Email: {
      label: 'email',
      onChange: setEmail,
      value: email,
      inputType: 'email'
    },
    TeacherCode: {
      label: 'teacher code',
      onChange: setTeacherCode,
      value: teacherCode,
      inputType: 'text'
    },
    SubjectCode: {
      label: 'subject code',
      onChange: setSubjectCode,
      value: subjectCode,
      inputType: 'text'
    },
    BookDept: {
      label: 'departments',
      onChange: setBookDepts,
      value: bookDepts,
      inputType: 'dropdown',
      multiple: true
    }
  };

  const inputs = {
    Student: ['Name', 'Semester', 'Roll', 'Dept', 'Email'],
    Teacher: ['Name', 'Dept', 'TeacherCode', 'Email'],
    Subject: ['Name', 'BookDept', 'SubjectCode', 'Semester']
  };
  const deptOptions = {
    Student: ['CSE', 'IT', 'ECE', 'EE'],
    Teacher: ['CSE', 'IT', 'ECE', 'EE', 'HBS'],
    Subject: ['CSE', 'IT', 'ECE', 'EE']
  };
  return (
    <Container className="form display-flex" fluid>
      <section className="formInputs">
        {inputs[type].map((input, index) => {
          const { label, onChange, value, inputType, multiple } =
            inputFields[input];
          return (
            <FormInput
              key={index}
              name={label}
              label={label}
              onChangeFunc={onChange}
              value={value}
              type={inputType}
              required={true}
              options={deptOptions[type]}
              multiple={multiple}
            />
          );
        })}
      </section>
      <Button variant="primary" className="submitBtn">
        Confirm
      </Button>
    </Container>
  );
};

export default NewEntryForm;
