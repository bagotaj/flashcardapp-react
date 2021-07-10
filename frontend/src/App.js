import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.scss';

import Navbar from './components/common/Navbar/Navbar';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Main from './components/pages/Main/Main';
import Dashboard from './components/pages/Dashboard/Dashboard';
import NewCards from './components/pages/NewCards/NewCards';

const App = () => {
  const history = useHistory();

  const [loggedInUser, setLoggedInUser] = useState(null);

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
                  loggedInUser={loggedInUser}
                />
              )}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/cards/new" component={NewCards} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
