import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../screen/Dashboard';
import Performance from '../screen/Performance';

const AuthorizedRoutes = () => {
  const Fallback = () => <p>Loading Page ...</p>;

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        <Route exact path="/auth/dashboard" component={Dashboard} />
        <Route exact path="/auth/performance" component={Performance} />
      </Switch>
    </Suspense>
  );
};

export default AuthorizedRoutes;
