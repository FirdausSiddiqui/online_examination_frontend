import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../screen/Dashboard';
import UploadQuestion from '../screen/UploadQuestion';

const AuthorizedRoutes = () => {
  const Fallback = () => <p>Loading Page ...</p>;

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        <Route exact path="/auth/uploadQuestion" component={UploadQuestion} />
        <Route exact path="/auth/dashboard" component={Dashboard} />
      </Switch>
    </Suspense>
  );
};

export default AuthorizedRoutes;
