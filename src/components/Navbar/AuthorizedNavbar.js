import React from 'react';
import { useDispatch } from 'react-redux';
import useDrawer from '../../hooks/useDrawer';
import Button from '../Button';
import Icon from '../Icon';
import axios from '../../axios';
import styles from './authorizedNavbar.module.css';
import { RESET_USER } from '../../actions';
import { useHistory } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';

const AuthorizedNavbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { showAlert } = useAlert();
  const { openDrawer, closeDrawer, isDrawerActive } = useDrawer();
  const logout = () => {
    try {
      axios.post('/logout');
      dispatch({
        type: RESET_USER
      });
      showAlert({ type: 'success', message: 'User logged out successfully' });
      history.replace('/login');
    } catch (error) {
      showAlert({
        type: 'error',
        message: 'There was some error. Please try again.'
      });
    }
  };
  return (
    <div className={styles.container}>
      <Button
        className={styles.toggle_btn}
        size="auto"
        onClick={isDrawerActive ? closeDrawer : openDrawer}>
        <Icon name="fas fa-bars" />
      </Button>

      <span className={styles.nav_title}>Test Spot</span>

      <Button className={styles.logOutButton} onClick={logout}>
        <Icon name="fas fa-sign-out-alt fa-lg" />
      </Button>
    </div>
  );
};

export default AuthorizedNavbar;
