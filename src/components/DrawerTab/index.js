import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../Icon';
import Button from '../Button';
import styles from './drawerTabLink.module.css';

const DrawerTab = ({ iconName, tabName, link }) => {
  return (
    <div className={styles.drawerTabLink}>
      <NavLink to={link}>
        <Icon name={iconName} className={styles.iconName} />
        <span className={styles.tabName}>{tabName}</span>
      </NavLink>
    </div>
  );
};

export default DrawerTab;
