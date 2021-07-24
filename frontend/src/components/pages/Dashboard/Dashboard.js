import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.scss';

const Dashboard = () => {
  // const { loggedInUser } = props;

  // const [userCards, setUserCards] = useState([]);

  return (
    <div className="container center-content">
      <div className="row mt-3">
        <div className="col-md-auto d-flex">
          <div className="box center-content">
            <Link to="/languagecards">Szókártyák</Link>
          </div>
          <div className="box center-content">
            <Link to="/othercards">Egyéb kártyák</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
