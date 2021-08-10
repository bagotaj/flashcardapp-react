import bcrypt from 'bcryptjs';
import logger from '../logger';
import { User } from '../models/User';
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqData.password, salt);

    const data = { ...reqData, password: hashedPassword };

    try {
      await User.findByIdAndUpdate(id, data, {
        useFindAndModify: false,
      });
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
