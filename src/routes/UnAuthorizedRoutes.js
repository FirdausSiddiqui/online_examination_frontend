import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../screen/Home';
import Login from '../screen/Login';
import Registration from '../screen/Registration';
import Contact from '../screen/Contact';
import TeacherSignup from '../screen/TeacherSignup';
import TeacherLogin from '../screen/TeacherLogin';
import StudentSignup from '../screen/StudentSignup';
import StudentLogin from '../screen/StudentLogin';
import AdminLogin from '../screen/AdminLogin';
import PageNotFound from '../screen/NotFound';
import LoaderContainer from '../components/Loader';

const UnauthorizedRoutes = () => {
  return (
    <Suspense fallback={<LoaderContainer />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/contact" component={Contact} />
        <Route path="/teacherSignup" component={TeacherSignup} />
        <Route path="/studentSignup" component={StudentSignup} />
        <Route path="/teacherLogin" component={TeacherLogin} />
        <Route path="/studentLogin" component={StudentLogin} />
        <Route path="/adminLogin" component={AdminLogin} />
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  );
};

export default UnauthorizedRoutes;
