import { otherCardsService } from '../services/otherCardsService';

export const otherCardsController = {
  async get(req, res) {
    const { userId, role } = req.user;

    const data = await otherCardsService.getCards(userId, role);
    res.status(data.status).json(data.body);
  },

  async getId(req, res) {
    const { id } = req.params;

    const data = await otherCardsService.getCardById(id);
    res.status(data.status).json(data.body);
  },

  async post(req, res) {
    const data = await otherCardsService.saveCards(req.body);
    res.status(data.status).json(data.message);
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await otherCardsService.updateCards(id, reqData);
    res.status(data.status).json(data.message);
  },

  async delete(req, res) {
    const deleteId = req.params.id;

    const data = await otherCardsService.deleteCardById(deleteId);
    res.status(data.status).json(data.message);
  },
};
