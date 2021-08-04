import React, { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';

const Main = () => {
  const server = process.env.REACT_APP_SERVER_URL;

  const [ranks, setRanks] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${server}/api/ranks/main`, { signal: abortController.signal })
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
    <>
      <div className="mt-5">
        <h2>Te hanyadik vagy?</h2>
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
        <Button
          linkRouterPath="/login"
          classes="text-link pt-3"
          title="Tovább >>"
        />
        <div className="my-5">
          <Button
            linkRouterPath="/register"
            classes="btn btn-primary me-2"
            title="Regisztráció"
          />
          <Button
            linkRouterPath="/login"
            classes="btn btn-primary"
            title="Bejelentkezés"
          />
        </div>
      </div>
    </>
  );
};

export default Main;
