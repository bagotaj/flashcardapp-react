import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Cards.scss';

const Cards = () => {
  const location = useLocation();
  const { card } = location.state;
  console.log(card);

  const [cardPack, setCardPack] = useState({});
  const [flashcards, setFlashcards] = useState([]);
  const [counter, setCounter] = useState(0);
  // const [rankPoints, setRankPoints] = useState(0);
  console.log(cardPack);
  console.log(flashcards);

  useEffect(() => {
    const setUpFormData = {
      cardType: card.cardType,
      cardTitle: card.cardTitle,
      description: card.description,
    };

    setCardPack(setUpFormData);
    setFlashcards(card.cards);
  }, [card]);

  const handlerOnClickIncreaseCounter = () => {
    const value = counter + 1;
    setCounter(value);
  };

  const handlerOnClickDecreaseCounter = () => {
    const value = counter - 1;
    setCounter(value);
  };

  return (
    <>
      <div className="mt-5">
        <h2>{cardPack.cardTitle}</h2>
        <button
          type="button"
          className="no-button"
          onClick={handlerOnClickDecreaseCounter}
        >
          {'<'}
        </button>
        {flashcards && (
          <div className="box center-content">
            {counter >= flashcards.length || counter < 0
              ? 'Nincs több kártya'
              : flashcards[counter].side1}
          </div>
        )}
        <button
          type="button"
          className="no-button"
          onClick={handlerOnClickIncreaseCounter}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default Cards;
