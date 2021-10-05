import { languageCardsService } from '../services/languageCardsService';

export const languageCardsController = {
  async get(req, res) {
    const { userId, role } = req.user;

    const data = await languageCardsService.getCards(userId, role);
    res.status(data.status).json(data.body);
  },

  async getId(req, res) {
    const { id } = req.params;

    const data = await languageCardsService.getCardById(id);
    res.status(data.status).json(data.body);
  },

  async post(req, res) {
    const data = await languageCardsService.saveCards(req.body);
    return res.status(data.status).json(data.message);
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await languageCardsService.updateCards(id, reqData);
    res.status(data.status).json(data.message);
  },

  async delete(req, res) {
    const deleteId = req.params.id;

    const data = await languageCardsService.deleteCardById(deleteId);
    res.status(data.status).json(data.message);
  },
};
