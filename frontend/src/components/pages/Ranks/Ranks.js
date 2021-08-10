import React, { useState, useEffect } from 'react';

import './Ranks.scss';

const Ranks = props => {
  const { loggedInUser } = props;

  const server = process.env.REACT_APP_BACKEND_SERVER_URL;

  const [ranks, setRanks] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(
      `${server}/api/ranks`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      },
      { signal: abortController.signal }
    )
      .then(res => {
        if (res.status === 204) {
          throw Error(res.body.message);
        }
        if (res.status !== 200) {
          throw Error(`Nem sikerült lekérni az adatokat. ${res.status}`);
        }
        return res.json();
      })
      .then(jsonRes => {
        setRanks(jsonRes);
        setAlert(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          throw Error(`Letöltés megszakítva`);
        } else {
          setAlert({ alertType: 'danger', message: err.message });
        }
      });

    return () => abortController.abort();
  }, []);

  return (
    <div className="mt-5">
      <h2>Ranglista</h2>
      {alert && (
        <div>
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        </div>
      )}
      {ranks.map((rank, index) => (
        <div className="box-mini center-content" key={rank._id}>
          <span className="rank-index">{index + 1}.</span>
          <span className="rank-name">{rank.userName}</span>
          <span className="rank-points">{rank.points} pont</span>
        </div>
      ))}
    </div>
  );
};

export default Ranks;
