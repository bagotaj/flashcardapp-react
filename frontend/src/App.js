import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.scss';

import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';
import NotFound from './components/pages/NotFound/NotFound';

import Navbar from './components/common/Navbar/Navbar';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Main from './components/pages/Main/Main';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Admin from './components/pages/Admin/Admin';
import Cards from './components/pages/Cards/Cards';
import NewCards from './components/pages/NewCards/NewCards';
import LanguageCards from './components/pages/LanguageCards/LanguageCards';
import EditCards from './components/pages/EditCards/EditCards';
import OtherCards from './components/pages/OtherCards/OtherCards';
import Users from './components/pages/Users/Users';
import EditUser from './components/pages/EditUser/EditUser';
import Ranks from './components/pages/Ranks/Ranks';

const App = () => {
  const history = useHistory();

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('loggedInUser')
      ? JSON.parse(localStorage.getItem('loggedInUser'))
      : null;
    setLoggedInUser(userFromLocalStorage);
  }, []);

  function handleLocalStorage(user) {
    return localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  const handleLogout = async e => {
    e.preventDefault();

    localStorage.clear();
    setLoggedInUser(null);

    history.push('/login');
  };

  return (
    <div className="App">
      <div className="container">
        <Navbar user={loggedInUser} handleLogout={handleLogout} />
        <div className="app-main">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route
              exact
              path="/login"
              component={() => (
                <Login
                  handleLoggedInUser={setLoggedInUser}
                  handleLocalStorage={handleLocalStorage}
                />
              )}
            />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute
              exact
              path="/languagecards"
              component={LanguageCards}
            />
            <PrivateRoute
              exact
              path="/languagecards/:cardId"
              component={EditCards}
            />
            <PrivateRoute exact path="/othercards" component={OtherCards} />
            <PrivateRoute
              exact
              path="/othercards/:cardId"
              component={EditCards}
            />
            <PrivateRoute exact path="/cards/" component={Cards} />
            <PrivateRoute exact path="/cards/new" component={NewCards} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/profile/:userId" component={EditUser} />
            <PrivateRoute exact path="/ranks" component={Ranks} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
