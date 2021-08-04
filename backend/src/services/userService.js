import logger from '../logger';
import User from '../models/User';
import { userValidation } from '../validators/userValidation';

export const userService = {
  async updateUser(id, reqData) {
    const { _id, __v, updatedAt, ...others } = reqData;
    const { error } = userValidation(others);

    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    try {
      await User.findByIdAndUpdate(id, reqData, { useFindAndModify: false });
      return {
        status: 200,
        message: 'Felhasználói adatok frissítve!',
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
