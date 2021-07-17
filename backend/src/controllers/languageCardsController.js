import { languageCardsService } from '../services/languageCardsService';

export const languageCardsController = {
  async post(req, res) {
    const data = await languageCardsService.saveCards(req.body);
    res.status(data.status).json(data);
  },
};
