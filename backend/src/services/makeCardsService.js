import logger from 'logger';
import LanguageCard from '../models/LanguageCard';
import cardValidation from '../cardValidation';

export const makeCardsService = {
  async saveCards(cardData) {
    const { error } = cardValidation(cardData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const card = new LanguageCard({
      cardTitle: cardData.cardTitle,
      cards: cardData.cards,
    });

    try {
      await card.save();
      return {
        status: 200,
        message: 'A kártyák mentve',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Valami hiba történt',
      };
    }
  },
};
