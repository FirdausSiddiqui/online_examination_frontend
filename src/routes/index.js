import React from 'react';
import { connect } from 'react-redux';
import AuthorizedRoutes from './AuthorizedRoutes';
import UnauthorizedRoutes from './UnAuthorizedRoutes';
import AuthorizedNavbar from '../components/Navbar/AuthorizedNavbar';
import Drawer from '../components/Drawer';
import styles from './routes.module.css';

const RootRoute = ({ userData }) => {
  return (
    <>
      {/* <>
                <Navbar />
                <UnauthorizedRoutes/>
            </> */}
      <div className={styles.container}>
        <AuthorizedNavbar />
        <div className={styles.drawerContainer}>
          <Drawer userType={userData.type} />
        </div>
        <div className={styles.content}>
          <AuthorizedRoutes userType={userData.type} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store, props) => ({
  userData: store.appData.user
});

export default connect(mapStateToProps, null)(RootRoute);
