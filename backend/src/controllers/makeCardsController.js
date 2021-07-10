import { makeCardsService } from '../services/makeCardsService';

export const makeCardsController = {
  async post(req, res) {
    const data = await makeCardsService.saveCards(req.body);
    res.status(data.status).json(data);
  },
};
