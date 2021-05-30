import React from 'react';

import styles from './ActivityIndicator.module.css';
const ActivityIndicator = ({ size, color }) => {
  const sizeClass = () => {
    switch (size) {
      case 's':
        return styles.size_s;
      case 'm':
        return styles.size_m;
      case 'l':
        return styles.size_l;
      default:
        return '';
    }
  };
  return (
    <div
      style={{
        borderColor: color
      }}
      className={`${styles.container} ${sizeClass()}`}
    />
  );
};

export default ActivityIndicator;
