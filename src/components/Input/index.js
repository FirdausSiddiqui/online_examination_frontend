import { useEffect, useState } from 'react';

const Input = ({ name, type, className, placeholder, required }) => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <input
      name={name}
      type={type}
      class={className}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
    />
  );
};

export default Input;
