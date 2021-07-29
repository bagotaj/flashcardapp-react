import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../common/Button/Button';

const OtherCards = props => {
  const { loggedInUser } = props;

  const server = process.env.REACT_APP_SERVER_URL;

  const [cards, setCards] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch(`${server}/api/othercards`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    })
      .then(res => {
        if (res.status !== 200) {
          throw Error(`Nem sikerült lekérni az adatokat. ${res.status}`);
        }
        return res.json();
      })
      .then(jsonRes => {
        setCards(jsonRes);
        setAlert(null);
      })
      .catch(err => {
        setAlert({ alertType: 'danger', message: err.message });
      });
  }, []);

  const handleOnClickDelete = e => {
    e.preventDefault();
    const cardId = e.target.dataset.id;

    fetch(`http://localhost:5000/api/othercards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loggedInUser.token}`,
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

    const newCardList = cards.filter(card => card.cardId !== cardId);

    setCards(newCardList);
  };

  return (
    <div className="mt-5">
      <h2>Egyéb kártyák</h2>
      {alert && (
        <div>
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        </div>
      )}
      {cards.map((card, index) => (
        <div className="box box-content-column" key={card._id}>
          <div className="box-content-row-up">
            <span className="box-element-edit">
              <Link
                to={{
                  pathname: `/othercards/${card._id}`,
                  state: {
                    card: cards[index],
                    loggedInUser,
                  },
                }}
              >
                +
              </Link>
              {/* <Link to={`/othercards/${card._id}`}>+</Link> */}
            </span>{' '}
            <Button
              onClick={handleOnClickDelete}
              buttonType="button"
              classes="no-button box-element-delete"
              title="-"
              dataid={card._id}
            />
          </div>
          <div className="box-content-row-down">
            <Link
              to={{
                pathname: '/cards',
                state: {
                  card: cards[index],
                },
              }}
            >
              {card.cardTitle}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherCards;
