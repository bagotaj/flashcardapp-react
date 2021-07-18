import React from 'react';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-2" />
        <div className="col-md-auto d-flex">
          <div className="box">Kártyacsomag 1</div>
          <div className="box">Kártyacsomag 2</div>
        </div>
        <div className="col col-lg-2" />
      </div>
    </div>
  );
};

export default Dashboard;
