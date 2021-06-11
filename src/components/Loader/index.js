import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './loader.module.css';

const LoaderContainer = ({ specialColor, text }) => {
  return (
    <main className={styles.loaderContainer}>
      <h1 className="mb-5">{text}</h1>
      <Loader
        type="TailSpin"
        color={specialColor ? specialColor : '#00BFFF'}
        height={120}
        width={120}
      />
    </main>
  );
};

export default LoaderContainer;
