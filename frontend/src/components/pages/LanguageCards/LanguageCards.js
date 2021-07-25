import React, { useEffect, useState } from 'react';

const LanguageCards = props => {
  const { token } = props;
  const server = process.env.REACT_APP_SERVER_URL;

  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${server}/api/languagecards`, {
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
        setCards(jsonRes);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <main className="container">
      <h2>Szókártyák</h2>

      <div>{error && <div className="error">{error}</div>}</div>
      {cards.map(card => (
        <div className="box center-content" key={card._id}>
          {card.cardTitle}
        </div>
      ))}
    </main>
  );
};

export default LanguageCards;
