import { useState } from 'react';
import generator from 'generate-password';
import { Button, Container } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import emailjs from 'emailjs-com';
import axios from '../../axios';
import LoaderContainer from '../../components/Loader';
import useAlert from '../../hooks/useAlert';

const NewEntryForm = ({ type }) => {
  const { showAlert } = useAlert();
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [roll, setRoll] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [bookDepts, setBookDepts] = useState([]);
  const [submitting, setSubmitting] = useState(false);

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
    },
    TeacherDept: {
      label: 'teacher department',
      onChange: setDept,
      value: dept,
      inputType: 'dropdown'
    }
  };

  const inputs = {
    Student: ['Name', 'Semester', 'Roll', 'Dept', 'Email'],
    Teacher: ['Name', 'Dept', 'TeacherCode', 'Email'],
    Subject: ['Name', 'BookDept', 'SubjectCode', 'Semester', 'TeacherDept']
  };
  const deptOptions = {
    Student: ['CSE', 'IT', 'ECE', 'EE'],
    Teacher: ['CSE', 'IT', 'ECE', 'EE', 'HBS'],
    Subject: ['CSE', 'IT', 'ECE', 'EE']
  };

  const requestBody = {
    Student: {
      name,
      roll: parseInt(roll),
      email,
      dept,
      sem: parseInt(semester),
      pass: generator.generate({ length: 6, numbers: true })
    },
    Teacher: {
      name,
      email,
      dept,
      teacherCode,
      password: generator.generate({ length: 6, numbers: true })
    },
    Subject: {
      code: subjectCode,
      name,
      sem: parseInt(semester),
      dept: bookDepts,
      teacherDept: dept
    }
  };

  const urls = {
    Student: '/addStudent',
    Teacher: '/addTeacher',
    Subject: '/addSubject'
  };

  const submitEntry = () => {
    setSubmitting(true);
    const body = requestBody[type];
    const emailMessage = {
      Student: { ID: roll, password: body.pass },
      Teacher: { ID: teacherCode, password: body.password }
    };
    axios
      .post(urls[type], body)
      .then((res) => {
        if (type === 'Student')
          emailjs.send(
            'service_3v2dv4m',
            'template_lbpaora',
            {
              ID: emailMessage[type].ID,
              password: emailMessage[type].password,
              name,
              email
            },
            'user_QASgJ4J7Brk2dFXYkt6YW'
          );
        showAlert({ message: `${type} added successfully` });
        resetInputs();
      })
      .catch((err) => {
        setSubmitting(false);
        if (err.message == 'Request failed with status code 409')
          showAlert({ type: 'error', message: `${type} already exists!` });
        else alert(err.message);
      });
  };

  const resetInputs = () => {
    setName('');
    setEmail('');
    setRoll('');
    setDept('');
    setSemester('');
    setSubjectCode('');
    setTeacherCode('');
    setSubmitting(false);
    setBookDepts([]);
    if (type === 'Teacher') {
      let newTeacherBody = {
        ...requestBody[type],
        password: generator.generate({ length: 6, numbers: true })
      };
      requestBody[type] = newTeacherBody;
    } else if (type === 'Student') {
      let newStudentBody = {
        ...requestBody[type],
        pass: generator.generate({ length: 6, numbers: true })
      };
      requestBody[type] = newStudentBody;
    }
  };
  return (
    <>
      {submitting && <LoaderContainer text="Submitting..." />}
      {!submitting && (
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
                  options={
                    input === 'TeacherDept'
                      ? deptOptions['Teacher']
                      : deptOptions[type]
                  }
                  multiple={multiple}
                />
              );
            })}
          </section>
          <Button
            variant="primary"
            className="submitBtn"
            onClick={submitEntry}
            disabled={submitting}>
            Confirm
          </Button>
        </Container>
      )}
    </>
  );
};

export default NewEntryForm;
