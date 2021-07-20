import { otherCardsService } from '../services/otherCardsService';

export const otherCardsController = {
  async post(req, res) {
    const data = await otherCardsService.saveCards(req.body);
    res.status(data.status).json(data);
  },
};
