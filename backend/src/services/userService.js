import bcrypt from 'bcryptjs';
import logger from '../logger';
import { Admin, User } from '../models/User';
import { userValidation } from '../validators/userValidation';

export const userService = {
  async getUsers() {
    try {
      const foundUsers = await User.find();
      return {
        status: 200,
        body: foundUsers,
      };
    } catch (err) {
      return {
        status: 400,
        body: err,
      };
    }
  },

  async getUserById(id) {
    try {
      let user;

      user = await User.findById(id);

      if (!user) {
        user = await Admin.findById(id);
      }

      return {
        status: 200,
        body: user,
      };
    } catch (err) {
      return {
        status: 400,
        body: err,
      };
    }
  },

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
      const user = await User.findByIdAndUpdate(id, data, {
        useFindAndModify: false,
      });

      if (!user) {
        await Admin.findByIdAndUpdate(id, data, {
          useFindAndModify: false,
        });
      }

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

  async deleteUserById(id) {
    try {
      const userData = await User.findByIdAndDelete(id);

      if (!userData)
        return {
          status: 404,
          message: 'A felhasználó nem található',
        };
      return {
        status: 200,
        message: 'A felhasználó törölve lett',
      };
    } catch (err) {
      return {
        status: 400,
        message: err,
      };
    }
  },
};
