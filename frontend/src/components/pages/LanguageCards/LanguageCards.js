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
          return res.json();
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
    const cardId = e.target.closest('button').dataset.id;

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
              <Link
                to={{
                  pathname: `/languagecards/${card._id}`,
                  state: {
                    card: cards[index],
                    loggedInUser,
                  },
                }}
                className="box-element-edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </Link>{' '}
              <Button
                onClick={handleOnClickDelete}
                buttonType="button"
                classes="no-button box-element-delete"
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                }
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
