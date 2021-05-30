import React from 'react';

import useDrawer from '../../hooks/useDrawer';
import Button from '../Button';
import Icon from '../Icon';

import styles from './authorizedNavbar.module.css';

const AuthorizedNavbar = () => {
  const { openDrawer, closeDrawer, isDrawerActive } = useDrawer();
  return (
    <div className={styles.container}>
      <Button
        className={styles.toggle_btn}
        size="auto"
        onClick={isDrawerActive ? closeDrawer : openDrawer}>
        <Icon name="fas fa-bars" />
      </Button>

      <span className={styles.nav_title}>Test Spot</span>

      <Button className={styles.logOutButton}>
        <Icon name="fas fa-sign-out-alt fa-lg" />
      </Button>
    </div>
  );
};

export default AuthorizedNavbar;
