import React from 'react';
import AuthorizedRoutes from './AuthorizedRoutes';
import UnauthorizedRoutes from './UnAuthorizedRoutes';
import AuthorizedNavbar from '../components/Navbar/AuthorizedNavbar';
import Drawer from '../components/Drawer';
import styles from './routes.module.css';

const RootRoute = () => {
  return (
    <>
      {/* <>
                <Navbar />
                <UnauthorizedRoutes/>
            </> */}
      <div className={styles.container}>
        <AuthorizedNavbar />
        <div className={styles.drawerContainer}>
          <Drawer />
        </div>
        <div className={styles.content}>
          <AuthorizedRoutes />
        </div>
      </div>
    </>
  );
};

export default RootRoute;
