import logger from 'logger';
import LanguageCard from '../models/Cards';
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
      description: cardData.description,
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
