import React, { useMemo, useEffect, useRef } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Drawer from './Drawer';
import MobileDrawer from './MobileDrawer';
import useDrawer from '../../hooks/useDrawer';

import { debounce } from '../../helper';

const DrawerContainer = () => {
  const debounceFuncRef = useRef(null);
  const { dimensions } = useWindowDimensions();
  const { isDrawerActive, toggleDrawer, openDrawer } = useDrawer();
  const isMobile = useMemo(() => {
    return dimensions.width <= 800;
  }, [dimensions.width]);

  if (!debounceFuncRef.current) {
    debounceFuncRef.current = debounce(openDrawer, 500);
  }

  useEffect(() => {
    const isDesktop = dimensions.width > 800;
    if (isDesktop) {
      debounceFuncRef.current();
    }
  }, [dimensions.width]);

  if (isMobile) {
    return (
      <MobileDrawer
        isDrawerActive={isDrawerActive}
        toggleDrawer={toggleDrawer}
        isMobileView={isMobile}
      />
    );
  } else {
    return <Drawer isMobileView={isMobile} isDrawerActive={isDrawerActive} />;
  }
};

export default DrawerContainer;
