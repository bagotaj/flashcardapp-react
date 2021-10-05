import logger from '../logger';
import { LanguageCard } from '../models/Cards';
import cardValidation from '../validators/cardValidation';

export const languageCardsService = {
  async getCards(userId, role) {
    try {
      const cards = await LanguageCard.find().then(foundCards => {
        if (role === 'admin') {
          return foundCards;
        }
        return foundCards.filter(card => card.userId === userId);
      });

      if (cards.length === 0) {
        return {
          status: 204,
          body: cards,
        };
      }

      return {
        status: 200,
        body: cards,
      };
    } catch (err) {
      return {
        status: 400,
        body: err,
      };
    }
  },

  async getCardById(id) {
    try {
      const card = await LanguageCard.findById(id);

      return {
        status: 200,
        body: card,
      };
    } catch (err) {
      return {
        status: 404,
        body: err,
      };
    }
  },

  async saveCards(cardData) {
    const { error } = cardValidation(cardData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const card = new LanguageCard({
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
      await LanguageCard.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'A kártyaadatok frissítve!',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Valami hiba történt',
      };
    }
  },

  async deleteCardById(deleteId) {
    try {
      const cardData = await LanguageCard.findByIdAndDelete(deleteId);
      if (!cardData)
        return {
          status: 404,
          message: 'A kártya nem található',
        };
      return {
        status: 200,
        message: 'A kártya törölve lett',
      };
    } catch (err) {
      return {
        status: 400,
        message: err,
      };
    }
  },
};
