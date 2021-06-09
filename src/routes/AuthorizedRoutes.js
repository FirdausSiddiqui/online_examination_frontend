import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../screen/Dashboard';
import QuestionBank from '../screen/QuestionBank';
import TakeExam from '../screen/Student/TakeExam';
import UploadQuestion from '../screen/UploadQuestion';

const AuthorizedRoutes = ({ userType }) => {
  const Fallback = () => <p>Loading Page ...</p>;

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        {/* <Redirect from="/auth" to="/auth/dashboard" /> */}
        <Route exact path="/auth/questionBank" component={QuestionBank} />
        <Route exact path="/auth/dashboard" component={Dashboard} />
        {userType == 'teacher' && (
          <Route exact path="/auth/uploadQuestion" component={UploadQuestion} />
        )}
        {userType == 'student' && (
          <Route exact path="/auth/takeExam" component={TakeExam} />
        )}
        <Route component={() => 'Page not found'} />
      </Switch>
    </Suspense>
  );
};

export default AuthorizedRoutes;
