import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OtherCards = props => {
  const { loggedInUser } = props;

  const server = process.env.REACT_APP_SERVER_URL;

  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

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
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="mt-5">
      <h2>Egyéb kártyák</h2>

      <div>{error && <div className="error">{error}</div>}</div>
      {cards.map((card, index) => (
        <div className="box box-content-column" key={card._id}>
          <div className="box-content-row-up">
            <span className="box-element-edit">
              <Link
                to={{
                  pathname: `/languagecards/${card._id}`,
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
            <span className="box-element-delete">-</span>
          </div>
          <div className="box-content-row-down">
            <Link to="/cards" cards={card.cards}>
              {card.cardTitle}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherCards;
