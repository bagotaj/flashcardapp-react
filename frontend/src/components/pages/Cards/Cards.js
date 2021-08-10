import React, { useState, useEffect } from 'react';
import { useLocation, Prompt } from 'react-router-dom';

import Button from '../../common/Button/Button';

import './Cards.scss';

const Cards = () => {
  const location = useLocation();
  const { card, loggedInUser } = location.state;

  const [cardPack, setCardPack] = useState({});
  const [flashcards, setFlashcards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [rankPoints, setRankPoints] = useState(0);
  const [shouldBlockNavigation] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      const setUpFormData = {
        cardType: card.cardType,
        cardTitle: card.cardTitle,
        description: card.description,
      };

      setCardPack(setUpFormData);
      setFlashcards(card.cards);
    }

    return () => {
      didCancel = true;
    };
  }, [card]);

  const handlerOnClickIncreaseCounter = () => {
    let value = counter + 1;
    let rankValue = rankPoints + 1;

    if (counter === flashcards.length) {
      value = flashcards.length;
      rankValue = rankPoints;
    }

    setCounter(value);
    setRankPoints(rankValue);
  };

  const handlerOnClickDecreaseCounter = () => {
    let value = counter - 1;
    if (counter === -1) {
      value = -1;
    }
    setCounter(value);
  };

  const server = process.env.REACT_APP_BACKEND_SERVER_URL;

  const setSentData = () => {
    const sentData = {
      userName: loggedInUser.firstName,
      userId: loggedInUser.userId,
      points: rankPoints,
    };

    return sentData;
  };

  const uploadRankData = () => {
    fetch(`${server}/api/ranks/${card.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loggedInUser.token}`,
      },
      body: JSON.stringify(setSentData()),
    })
      .then(res => {
        if (res.status !== 200) {
          throw Error(`Nem sikerült menteni az adatokat. ${res.status}`);
        }
        setAlert(null);
      })
      .catch(err => {
        setAlert({ alertType: 'danger', message: err.message });
      });
  };

  return (
    <>
      {alert && (
        <div>
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        </div>
      )}
      <Prompt
        when={shouldBlockNavigation}
        message={() => {
          uploadRankData();

          return `${rankPoints} pontot értél el!`;
        }}
      />
      <div className="mt-5">
        <div className="cards-title">
          <h2 className="cards-h2">{cardPack.cardTitle}</h2>
          <Button
            linkRouterPath={{
              pathname: `/${
                card.cardType === 'Nyelv kártya'
                  ? 'languagecards'
                  : 'othercards'
              }/${card._id}`,
              state: {
                card,
                loggedInUser,
              },
            }}
            classes="btn btn-primary new-card-one-button"
            title="+"
          />
        </div>
        <button
          type="button"
          className="no-button-cards"
          onClick={handlerOnClickDecreaseCounter}
        >
          {'<'}
        </button>
        {flashcards &&
          (counter >= flashcards.length || counter < 0 ? (
            <div className="box center-content">Nincs több kártya</div>
          ) : (
            <div className="box">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front center-content">
                    {flashcards[counter].side1}
                  </div>
                  <div className="flip-card-back center-content">
                    {flashcards[counter].side2}
                  </div>
                </div>
              </div>
            </div>
          ))}
        <button
          type="button"
          className="no-button-cards"
          onClick={handlerOnClickIncreaseCounter}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default Cards;
