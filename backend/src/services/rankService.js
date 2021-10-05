import logger from '../logger';
import { Ranks } from '../models/Ranks';
import { rankValidation } from '../validators/rankValidation';

export const rankService = {
  async getRanks() {
    try {
      const foundRanks = await Ranks.find().sort({ points: -1 });

      return {
        status: 200,
        body: foundRanks,
      };
    } catch (err) {
      return {
        status: 400,
        body: err,
      };
    }
  },

  async getTopFiveRanks() {
    try {
      const foundRanks = await Ranks.aggregate()
        .sort({ points: -1 })
        .limit(5)
        .then(ranks => ranks);

      return {
        status: 200,
        body: foundRanks,
      };
    } catch (err) {
      return {
        status: 400,
        body: err,
      };
    }
  },

  async updateRanks(id, reqData) {
    const { _id, __v, updatedAt, ...others } = reqData;
    const { error } = rankValidation(others);

    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    try {
      const userId = { userId: id };

      await Ranks.findOneAndUpdate(
        userId,
        { $inc: { points: reqData.points } },
        {
          useFindAndModify: false,
        }
      );
      return {
        status: 200,
        message: 'Felhasználói pontszámok frissítve!',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Valami hiba történt',
      };
    }
  },
};
