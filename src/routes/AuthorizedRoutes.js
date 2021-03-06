import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoaderContainer from '../components/Loader';
import Dashboard from '../screen/Dashboard';
import Performance from '../screen/Performance';
import ExamResult from '../screen/Result/ExamResult';
import QuestionBank from '../screen/QuestionBank';
import TakeExam from '../screen/Student/TakeExam';
import UploadQuestion from '../screen/UploadQuestion';
import NewEntry from '../screen/NewEntry';
import PageNotFound from '../screen/NotFound';

const AuthorizedRoutes = ({ userType }) => {
  return (
    <Suspense fallback={<LoaderContainer />}>
      <Switch>
        {/* <Redirect from="/auth" to="/auth/dashboard" /> */}
        <Route exact path="/auth/questionBank" component={QuestionBank} />
        <Route exact path="/auth/dashboard" component={Dashboard} />
        <Route exact path="/auth/performance" component={Performance} />
        <Route exact path="/auth/examresult" component={ExamResult} />
        {userType === 'admin' && (
          <Route exact path="/auth/newEntry" component={NewEntry} />
        )}
        {userType === 'teacher' && (
          <Route exact path="/auth/uploadQuestion" component={UploadQuestion} />
        )}
        {userType === 'student' && (
          <Route exact path="/auth/takeExam" component={TakeExam} />
        )}
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  );
};

export default AuthorizedRoutes;
