import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import NotFound from '../../components/pages/NotFound/NotFound';

const PrivateRoute = ({ component: Component, path }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!loggedInUser) {
    return <Redirect to="/login" />;
  }

  if (loggedInUser.role === 'user') {
    if (path === '/admin' || path === '/users') {
      return <NotFound />;
    }
    return (
      <Route exact path={path}>
        <Component loggedInUser={loggedInUser} />
      </Route>
    );
  }

  return (
    <Route exact path={path}>
      <Component loggedInUser={loggedInUser} />
    </Route>
  );
};

export default PrivateRoute;
