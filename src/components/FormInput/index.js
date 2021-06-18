import styles from './formInput.module.css';

const FormInput = ({ name, label, onChangeFunc, value, type }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <input
        name={name}
        className={styles.inputField}
        placeholder={name}
        value={value}
        onChange={(e) => onChangeFunc(e.target.value)}
        type={type}
      />
    </div>
  );
};

export default FormInput;
