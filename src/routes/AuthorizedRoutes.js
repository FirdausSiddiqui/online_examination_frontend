import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoaderContainer from '../components/Loader';
import Dashboard from '../screen/Dashboard';
import QuestionBank from '../screen/QuestionBank';
import UploadQuestion from '../screen/UploadQuestion';

const AuthorizedRoutes = () => {
  return (
    <Suspense fallback={<LoaderContainer />}>
      <Switch>
        <Route exact path="/auth/questionBank" component={QuestionBank} />
        <Route exact path="/auth/uploadQuestion" component={UploadQuestion} />
        <Route exact path="/auth/dashboard" component={Dashboard} />
      </Switch>
    </Suspense>
  );
};

export default AuthorizedRoutes;
