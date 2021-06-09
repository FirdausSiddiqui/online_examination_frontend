import React from 'react';

import InsertInDom from '../InsertInDom';
import Drawer from './Drawer';
import useTransition from '../../hooks/useTransition';

import styles from './drawer.module.css';

const MobileDrawer = ({
  toggleDrawer,
  isDrawerActive,
  isMobileView,
  userType
}) => {
  const { isVisible } = useTransition({ active: isDrawerActive, maxWait: 400 });
  return (
    isVisible && (
      <InsertInDom domId="overlay">
        <div className={styles.mob_cont}>
          <div
            style={{
              opacity: isDrawerActive ? 1 : 0
            }}
            role="button"
            onClick={toggleDrawer}
            className={styles.overlay}
          />
          <Drawer
            isMobileView={isMobileView}
            isDrawerActive={isDrawerActive}
            userType={userType}
          />
        </div>
      </InsertInDom>
    )
  );
};

export default MobileDrawer;
