import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import FormCards from '../../common/FormCards/FormCards';

const EditCards = () => {
  const location = useLocation();
  const { card, loggedInUser } = location.state;

  const [cardPack] = useState({
    cardType: card.cardType,
    cardTitle: card.cardTitle,
    description: card.description,
  });
  const [flashcards] = useState(card.cards);

  return (
    <>
      <div className="row mt-5">
        <h2>Kártyacsomag szerkesztése</h2>
        <FormCards
          type="edit"
          loggedInUser={loggedInUser}
          cardPack={cardPack}
          flashcardPack={flashcards}
        />
      </div>
    </>
  );
};

export default EditCards;
