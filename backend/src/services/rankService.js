import logger from '../logger';
import { Ranks } from '../models/Ranks';
import { rankValidation } from '../validators/rankValidation';

export const rankService = {
  async updateRanks(id, reqData) {
    const { _id, __v, updatedAt, ...others } = reqData;
    const { error } = rankValidation(others);
    console.log(id);

    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    try {
      await Ranks.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'Felhasználói pontszámok frissítve!',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Valami nem működik',
      };
    }
  },
};
