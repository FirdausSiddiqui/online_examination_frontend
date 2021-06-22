import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthorizedRoutes from './AuthorizedRoutes';
import UnauthorizedRoutes from './UnAuthorizedRoutes';
import AuthorizedNavbar from '../components/Navbar/AuthorizedNavbar';
import UnauthorizedNavbar from '../components/Navbar/UnAuthorizedNavbar';
import Drawer from '../components/Drawer';
import styles from './routes.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { countCharactersInAString } from '../helper';
import Alert from '../components/Alert';

const RootRoute = ({ userData }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (userData.type) {
      if (pathname === '/studentLogin' || pathname === '/teacherLogin') {
        history.replace('/auth/dashboard');
      } else {
        history.replace(pathname);
      }
    }
  }, [userData, history, pathname]);
  return (
    <>
      {!userData.type ? (
        <>
          <UnauthorizedNavbar />
          <UnauthorizedRoutes />
        </>
      ) : (
        <div className={styles.container}>
          <AuthorizedNavbar />
          <div className={styles.drawerContainer}>
            <Drawer userType={userData.type} />
          </div>
          <div className={styles.content}>
            <AuthorizedRoutes userType={userData.type} />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (store, props) => ({
  userData: store.appData.user
});

export default connect(mapStateToProps, null)(RootRoute);
