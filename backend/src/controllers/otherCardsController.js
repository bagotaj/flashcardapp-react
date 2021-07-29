import { OtherCard } from '../models/Cards';
import { otherCardsService } from '../services/otherCardsService';

export const otherCardsController = {
  async get(req, res, next) {
    try {
      await OtherCard.find()
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

  async getId(req, res) {
    try {
      const card = await OtherCard.findById(req.params.id);
      return res.status(200).json(card);
    } catch (err) {
      return res.status(404).json(err);
    }
  },

  async post(req, res) {
    const data = await otherCardsService.saveCards(req.body);
    res.status(data.status).json(data);
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await otherCardsService.updateCards(id, reqData);
    res.status(data.status).json(data);
  },

  async delete(req, res) {
    const deleteId = req.params.id;

    try {
      const userData = await OtherCard.findByIdAndDelete(deleteId);
      if (!userData) return res.sendStatus(404);
      return res.status(200).send({ message: 'A kártya törölve lett' });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
