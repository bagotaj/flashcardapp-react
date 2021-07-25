import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';

import './Users.scss';

const Users = props => {
  const { token } = props;

  const server = process.env.REACT_APP_SERVER_URL;

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

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
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <>
      <h2>Felhasználók</h2>

      <div>{error && <div className="error">{error}</div>}</div>

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
                {index}
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
                  buttonType="button"
                  classes="btn btn-warning user-one-button"
                  title="-"
                  dataid={index}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
