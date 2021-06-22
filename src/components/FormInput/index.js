import styles from './formInput.module.css';
import cx from 'classnames';
import Icon from '../../components/Icon';
import { useState } from 'react';

const FormInput = ({
  name,
  label,
  onChangeFunc,
  value,
  type,
  required,
  options,
  multiple
}) => {
  const [isValid, setIsValid] = useState(true);
  const onInputChange = (e) => {
    if (!e.target.validity.valid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    onChangeFunc(e.target.value);
  };
  const onMultipleSelect = () => {
    const selectOptions = document.getElementById('multiselect').options;
    let selectedOps = [];
    for (let option of selectOptions) {
      const { value, selected } = option;
      if (selected) {
        selectedOps.push(value);
      }
    }
    onChangeFunc(selectedOps);
  };
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      {type !== 'dropdown' && (
        <input
          id={name}
          name={name}
          className={cx(styles.inputField, !isValid && styles.inValid)}
          placeholder={name}
          value={value}
          onChange={(e) => onInputChange(e)}
          type={type}
        />
      )}
      {type === 'dropdown' && (
        <select
          id="multiselect"
          size="1"
          multiple={multiple}
          name={name}
          className={cx(styles.inputField, !isValid && styles.inValid)}
          onChange={multiple ? onMultipleSelect : (e) => onInputChange(e)}>
          <option value="">Choose {name}</option>
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      )}
      <Icon name="fas fa-asterisk" className={styles.required} />
    </div>
  );
};

export default FormInput;
