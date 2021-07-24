import { LanguageCard } from '../models/Cards';
import { languageCardsService } from '../services/languageCardsService';

export const languageCardsController = {
  async get(req, res, next) {
    try {
      await LanguageCard.find()
        .then(foundCards => {
          if (req.user.role === 'admin') {
            return foundCards;
          }
          return foundCards.filter(card => card.userId === req.user.userId);
        })
        .then(foundCards => res.status(200).json(foundCards));
    } catch (err) {
      next(err);
    }
  },

  async post(req, res) {
    const data = await languageCardsService.saveCards(req.body);
    res.status(data.status).json(data);
  },
};
