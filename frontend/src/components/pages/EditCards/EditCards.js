import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import FormCards from '../../common/FormCards/FormCards';

const EditCards = () => {
  const location = useLocation();
  const { card, loggedInUser } = location.state;
  // const { loggedInUser } = location.state;
  console.log('Edit card', card);

  // const server = process.env.REACT_APP_SERVER_URL;
  // const url = `${server}/api${location.pathname}`;

  const [cardPack, setCardPack] = useState({});
  const [flashcards, setFlashcards] = useState([]);
  // const [alert, setAlert] = useState(null);

  useEffect(() => {
    const setUpFormData = {
      cardType: card.cardType,
      cardTitle: card.cardTitle,
      description: card.description,
    };

    setCardPack(setUpFormData);
    setFlashcards(card.cards);
    console.log('useEffect', setUpFormData);
  }, [card]);

  // useEffect(async () => {
  //   const abortController = new AbortController();

  //   await fetch(
  //     url,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${loggedInUser.token}`,
  //       },
  //     },
  //     { signal: abortController.signal }
  //   )
  //     .then(res => {
  //       if (res.status !== 200) {
  //         throw Error(`Nem sikerült lekérni az adatokat. ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then(jsonRes => {
  //       const setUpFormData = {
  //         cardType: jsonRes.cardType,
  //         cardTitle: jsonRes.cardTitle,
  //         description: jsonRes.description,
  //         side1: '',
  //         side2: '',
  //       };

  //       setCardPack(setUpFormData);

  //       const setUpFlashcards = [];

  //       jsonRes.cards.forEach(onecard => {
  //         const sides = {
  //           side1: onecard.side1,
  //           side2: onecard.side2,
  //         };

  //         setUpFlashcards.push(sides);
  //       });

  //       setFlashcards(setUpFlashcards);
  //       setAlert(null);
  //     })
  //     .catch(err => {
  //       if (err.name === 'AbortError') {
  //         setAlert({ alertType: 'danger', message: 'Letöltés megszakítva' });
  //       } else {
  //         setAlert({ alertType: 'danger', message: err.message });
  //       }
  //     });
  //   return () => abortController.abort();
  // }, []);

  console.log('Edit cardPack', cardPack);
  console.log('Edit flashcards', flashcards);
  console.log(
    'Empty?',
    Object.keys(cardPack).length === 0 && cardPack.constructor === Object
  );

  return (
    <>
      {Object.keys(cardPack).length === 0 && cardPack.constructor === Object && (
        <div className="row mt-5">
          <h2>Kártyacsomag szerkesztése</h2>
          {alert && (
            <div>
              <p className={`alert alert-${alert.alertType}`}>
                {alert.message}
              </p>
            </div>
          )}
          <FormCards
            type="edit"
            loggedInUser={loggedInUser}
            cardPack={cardPack}
            flashcardPack={flashcards}
          />
        </div>
      )}
    </>
  );
};

export default EditCards;
