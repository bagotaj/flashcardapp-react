import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <Link to="/users" className="box center-content">
        Felhasználók listája
      </Link>
      <Link to="/ranks" className="box center-content">
        Felhasználók ranglistája
      </Link>
      <Link to="/languagecards" className="box center-content">
        Szókártya lista
      </Link>
      <Link to="/othercards" className="box center-content">
        Egyéb kártyák listája
      </Link>
    </div>
  );
};

export default Admin;
