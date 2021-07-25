import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.scss';

import Navbar from './components/common/Navbar/Navbar';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Main from './components/pages/Main/Main';
import Dashboard from './components/pages/Dashboard/Dashboard';
import NewCards from './components/pages/NewCards/NewCards';
import LanguageCards from './components/pages/LanguageCards/LanguageCards';
import OtherCards from './components/pages/OtherCards/OtherCards';
import Users from './components/pages/Users/Users';
import EditUser from './components/pages/EditUser/EditUser';

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
            <Route
              exact
              path="/dashboard"
              component={() => <Dashboard loggedInUser={loggedInUser} />}
            />
            <Route
              exact
              path="/languagecards"
              component={() => <LanguageCards token={loggedInUser.token} />}
            />
            <Route
              exact
              path="/othercards"
              component={() => <OtherCards token={loggedInUser.token} />}
            />
            <Route
              exact
              path="/users"
              component={() => <Users token={loggedInUser.token} />}
            />
            <Route
              exact
              path="/profile/:userId"
              component={() => <EditUser token={loggedInUser.token} />}
            />
            <Route
              exact
              path="/cards/new"
              component={() => <NewCards loggedInUser={loggedInUser} />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
