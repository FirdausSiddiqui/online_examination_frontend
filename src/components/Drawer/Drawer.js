import React, { useMemo } from 'react';
import DrawerTab from '../DrawerTab';

import styles from './drawer.module.css';

const Drawer = ({ isDrawerActive, isMobileView, userType }) => {
  const isZeroWidth = useMemo(() => {
    return !isDrawerActive && !isMobileView;
  }, [isDrawerActive, isMobileView]);
  return (
    <div
      style={{
        transform:
          isDrawerActive || !isMobileView
            ? 'translateX(0%)'
            : 'translateX(-100%)'
      }}
      className={`${styles.container} ${isZeroWidth ? styles.zero_width : ''} ${
        !isMobileView ? styles.shadow : ''
      }`}>
      <DrawerTab
        tabName="Dashboard"
        link="/auth/dashboard"
        iconName="fas fa-home"
      />
      <DrawerTab
        tabName="Question Bank"
        link="/auth/questionBank"
        iconName="fas fa-book"
      />
      {userType === 'teacher' && (
        <DrawerTab
          tabName="New Exam Paper"
          link="/auth/uploadQuestion"
          iconName="fas fa-upload"
        />
      )}
    </div>
  );
};

export default Drawer;
