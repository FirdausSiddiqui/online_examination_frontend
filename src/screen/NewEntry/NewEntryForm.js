import { useState } from 'react';
import { Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import FormInput from '../../components/FormInput';

const NewEntryForm = () => {
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [roll, setRoll] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');

  const inputs = {
    Name: {
      label: 'name',
      onChange: setName,
      value: name,
      type: 'text'
    },
    Semester: {
      label: 'semester',
      onChange: setSemester,
      value: semester,
      type: 'number'
    }
  };

  return (
    <Container className="form">
      <FormInput
        name="Name"
        label="name"
        onChangeFunc={setName}
        value={name}
        type="text"
      />
      <FormInput
        name="Semester"
        label="semester"
        onChangeFunc={setSemester}
        value={semester}
        type="number"
      />
      <FormInput
        name="University Roll"
        label="roll"
        onChangeFunc={setRoll}
        value={roll}
        type="number"
      />
      <FormInput
        name="Department"
        label="department"
        onChangeFunc={setDept}
        value={dept}
        type="text"
      />
      <FormInput
        name="Email ID"
        label="email"
        onChangeFunc={setEmail}
        value={email}
        type="email"
      />
    </Container>
  );
};

export default NewEntryForm;
