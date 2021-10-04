import { rankService } from '../services/rankService';

export const rankController = {
  async get(req, res) {
    const data = await rankService.getRanks();
    res.status(data.status).json(data.body);
  },

  async getTopFive(req, res) {
    const data = await rankService.getTopFiveRanks();
    res.status(data.status).json(data.body);
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await rankService.updateRanks(id, reqData);
    res.status(data.status).json(data.message);
  },
};
