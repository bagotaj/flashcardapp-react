import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.scss';

const Dashboard = () => {
  // const { loggedInUser } = props;

  // const [userCards, setUserCards] = useState([]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <Link to="/languagecards" className="box center-content">
            Szókártyák
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/othercards" className="box center-content">
            Egyéb kártyák
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
