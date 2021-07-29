import logger from '../logger';
import { OtherCard } from '../models/Cards';
import cardValidation from '../validators/cardValidation';

export const otherCardsService = {
  async saveCards(cardData) {
    const { error } = cardValidation(cardData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const card = new OtherCard({
      cardType: cardData.cardType,
      cardTitle: cardData.cardTitle,
      description: cardData.description,
      cards: cardData.cards,
      userId: cardData.userId,
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

  async updateCards(id, reqData) {
    const { _id, __v, updatedAt, ...others } = reqData;
    const { error } = cardValidation(others);

    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    try {
      await OtherCard.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'Felhasználói adatok frissítve!',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Valami nem működik',
      };
    }
  },
};
