import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { generateRandomId } from '../helper';
import { getAlerts } from '../selectors/alert';
import { DE_ACTIVATE_ALERT, ACTIVATE_ALERT } from '../actions';

const useAlert = () => {
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const alertsList = useSelector(getAlerts);

  const hideAlert = useCallback(
    (id) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      dispatch({
        type: DE_ACTIVATE_ALERT,
        payload: { id }
      });
    },
    [dispatch]
  );

  // useEffect(() => {
  //   showAlert({});
  // }, [alertsList]);
  const showAlert = useCallback(
    ({
      message = '',
      type = 'success', //success, info, warning, error
      position = 'right',
      fixed = false,
      maxTime = 3000
    }) => {
      const id = generateRandomId();
      dispatch({
        type: ACTIVATE_ALERT,
        payload: { message: String(message), type, position, id }
      });

      if (!fixed) {
        const timer = setTimeout(() => {
          hideAlert(id);
        }, maxTime);
        timerRef.current = timer;
      }
    },
    [dispatch, hideAlert, alertsList]
  );

  return {
    showAlert,
    hideAlert,
    alertsList
  };
};

export default useAlert;
