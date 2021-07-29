import { LanguageCard } from '../models/Cards';
import { languageCardsService } from '../services/languageCardsService';

export const languageCardsController = {
  async get(req, res, next) {
    try {
      await LanguageCard.find()
        .then(foundCards => {
          if (foundCards.length === 0)
            return res
              .status(204)
              .json({ message: 'Nincs még kártya mentve!' });

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

  async getId(req, res) {
    try {
      const card = await LanguageCard.findById(req.params.id);
      return res.status(200).json(card);
    } catch (err) {
      return res.status(404).json(err);
    }
  },

  async post(req, res) {
    const data = await languageCardsService.saveCards(req.body);
    return res.status(data.status).json(data);
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await languageCardsService.updateCards(id, reqData);
    res.status(data.status).json(data);
  },
};
