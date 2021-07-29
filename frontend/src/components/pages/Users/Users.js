import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';

import './Users.scss';

const Users = props => {
  const { token } = props;

  const server = process.env.REACT_APP_SERVER_URL;

  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch(`${server}/api/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status !== 200) {
          throw Error(`Nem sikerült lekérni az adatokat. ${res.status}`);
        }

        return res.json();
      })
      .then(jsonRes => {
        setUsers(jsonRes);
        setAlert(null);
      })
      .catch(err => {
        setAlert({ alertType: 'danger', message: err.message });
      });
  }, []);

  const handleOnClickDelete = e => {
    e.preventDefault();
    const userId = e.target.dataset.id;

    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status !== 200) {
          throw Error(`Nem sikerült lekérni az adatokat. ${res.status}`);
        }
        setAlert(null);
      })
      .catch(err => {
        setAlert({ alertType: 'danger', message: err.message });
      });

    const newUserList = users.filter(user => user.userId !== userId);

    setUsers(newUserList);
  };

  return (
    <div className="mt-5">
      <h2>Felhasználók</h2>
      {alert && (
        <div>
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        </div>
      )}
      <table className="table cell-hyphens">
        <thead>
          <tr>
            <th scope="col" className="mobile-none">
              #
            </th>
            <th scope="col" className="mobile-none">
              Felhasználónév
            </th>
            <th scope="col">Vezetéknév</th>
            <th scope="col">Keresztnév</th>
            <th scope="col">+ / -</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row" className="mobile-none">
                {index + 1}
              </th>
              <td className="mobile-none">{user.userName}</td>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>
                <Button
                  linkRouterPath={`/profile/${user._id}`}
                  classes="btn btn-primary user-one-button"
                  title="+"
                  dataid={index}
                />
                <Button
                  onClick={handleOnClickDelete}
                  buttonType="button"
                  classes="btn btn-warning user-one-button"
                  title="-"
                  dataid={user._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
