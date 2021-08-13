import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

const LanguageCards = props => {
  const { loggedInUser } = props;

  const server = process.env.REACT_APP_BACKEND_SERVER_URL;

  const [cards, setCards] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(
      `${server}/api/languagecards`,
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
        setCards(jsonRes);
        setAlert(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          throw Error(`Letöltés megszakítva`);
        } else {
          setAlert({ alertType: 'warning', message: err.message });
        }
      });

    return () => abortController.abort();
  }, []);

  const handleOnClickDelete = e => {
    e.preventDefault();
    const cardId = e.target.dataset.id;

    fetch(`${server}/api/languagecards/${cardId}`, {
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
        setAlert({ alertType: 'warning', message: err.message });
      });

    const newCardList = cards.filter(card => card._id !== cardId);

    setCards(newCardList);
  };

  return (
    <div className="mt-5">
      <div className="cards-title">
        <h2 className="cards-h2">Szókártyák</h2>
        <Button
          linkRouterPath="/cards/new"
          classes="btn btn-primary new-card-one-button"
          title="+"
        />
      </div>
      {alert && (
        <div>
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        </div>
      )}
      {cards.length !== 0 ? (
        cards.map((card, index) => (
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
                    loggedInUser,
                  },
                }}
              >
                {card.cardTitle}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Nincs még szókártyád?</p>
          <Button
            linkRouterPath="/cards/new"
            classes="text-link"
            title="Készíts egyet!"
          />
        </div>
      )}
    </div>
  );
};

export default LanguageCards;
