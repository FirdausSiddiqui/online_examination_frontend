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

const UnauthorizedRoutes = () => {
  const Fallback = () => <p>Loading Page ...</p>;

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/contact" component={Contact} />
        <Route path="/teacherSignup" component={TeacherSignup} />
        <Route path="/studentSignup" component={StudentSignup} />
        <Route path="/teacherLogin" component={TeacherLogin} />
        <Route path="/studentLogin" component={StudentLogin} />
      </Switch>
    </Suspense>
  );
};

export default UnauthorizedRoutes;
