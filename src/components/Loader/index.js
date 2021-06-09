import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './loader.module.css';

const LoaderContainer = ({ specialColor }) => {
  return (
    <main className={styles.loaderContainer}>
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
