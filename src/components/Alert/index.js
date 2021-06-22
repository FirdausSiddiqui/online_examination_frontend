import React, { useMemo, useEffect } from 'react';

import Icon from '../Icon';
import InsertInDom from '../InsertInDom';

import useAlert from '../../hooks/useAlert';

import styles from './Alert.module.css';
import { connect } from 'react-redux';

const Alert = ({ alertsList }) => {
  const { hideAlert } = useAlert();
  const alertsData = useMemo(() => {
    return Object.values(alertsList).map(
      ({ position, type, message, id }, index) => {
        let posStyle = '';
        let typeStyle = '';
        const distanceStyle = {};

        switch (position) {
          case 'top':
            posStyle = styles.top;
            distanceStyle.top = `${index * 60 + 15 * (index + 1)}px`;
            break;
          case 'bottom':
            posStyle = styles.bottom;
            distanceStyle.bottom = `${index * 60 + 15 * (index + 1)}px`;
            break;
          case 'right':
            posStyle = styles.right;
            distanceStyle.top = `${index * 60 + 15 * (index + 1)}px`;
            break;
          case 'left':
            posStyle = styles.left;
            distanceStyle.top = `${index * 60 + 15 * (index + 1)}px`;
            break;
          default:
            break;
        }

        switch (type) {
          case 'success':
            typeStyle = styles.success;
            break;
          case 'error':
            typeStyle = styles.error;
            break;
          case 'warning':
            typeStyle = styles.warning;
            break;
          case 'info':
            typeStyle = styles.info;
            break;
          default:
            break;
        }
        return { typeStyle, posStyle, distanceStyle, message, id };
      }
    );
  }, [alertsList]);

  return (
    Object.keys(alertsList).length > 0 && (
      <InsertInDom domId="alert">
        {alertsData.map(
          ({ distanceStyle, posStyle, typeStyle, message, id }) => {
            return (
              <div
                key={id}
                style={distanceStyle}
                className={`${styles.container} ${posStyle} ${typeStyle} rc`}>
                <button onClick={() => hideAlert(id)} className={styles.close}>
                  <Icon name="fas fa-times" />
                </button>
                <span>{message}</span>
              </div>
            );
          }
        )}
      </InsertInDom>
    )
  );
};

const mapStateToProps = (store, props) => ({
  alertsList: store?.alerts?.alertsList || {}
});

export default connect(mapStateToProps, null)(Alert);
