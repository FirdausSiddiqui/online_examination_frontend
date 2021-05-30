import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TOGGLE_DRAWER, OPEN_DRAWER, CLOSE_DRAWER } from '../actions';

import { isDrawerOpen } from '../selectors/appData';

const useDrawer = () => {
  const dispatch = useDispatch();
  const isDrawerActive = useSelector(isDrawerOpen);

  const toggleDrawer = useCallback(() => {
    dispatch({
      type: TOGGLE_DRAWER
    });
  }, [dispatch]);
  const openDrawer = useCallback(() => {
    dispatch({
      type: OPEN_DRAWER
    });
  }, [dispatch]);

  const closeDrawer = useCallback(() => {
    dispatch({
      type: CLOSE_DRAWER
    });
  }, [dispatch]);

  return {
    isDrawerActive,
    toggleDrawer,
    openDrawer,
    closeDrawer
  };
};

export default useDrawer;
