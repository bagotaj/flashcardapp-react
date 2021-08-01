import { rankService } from '../services/rankService';
import { Ranks } from '../models/Ranks';

export const rankController = {
  get(req, res) {
    try {
      Ranks.find()
        .sort({ points: -1 })
        .then(foundRanks => res.status(200).json(foundRanks));
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await rankService.updateRanks(id, reqData);
    res.status(data.status).json(data);
  },
};
