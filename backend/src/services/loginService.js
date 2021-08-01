import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logger';

import { loginValidation } from '../validators/loginValidation';
import User from '../models/User';
import { Ranks } from '../models/Ranks';

export const loginService = {
  async loginUser(loginData) {
    const { error } = loginValidation(loginData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const user = await User.findOne({ email: loginData.email });
    if (!user) {
      return {
        status: 400,
        message: 'Az email cím még nincs regisztrálva',
      };
    }

    const validPass = await bcrypt.compare(loginData.password, user.password);
    if (!validPass) {
      return {
        status: 400,
        message: 'Az email cím vagy a jelszó nem megfelelő',
      };
    }

    const authUser = {
      userId: user.id,
      firstName: user.firstName,
      role: user.role,
    };

    const accessToken = jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET);

    const rankElement = await Ranks.findOne({ userId: user.id });

    if (!rankElement) {
      try {
        const newRankElement = new Ranks({
          userId: user.id,
          userName: user.userName,
          points: 0,
        });

        await newRankElement.save();
      } catch (err) {
        logger.error(err);
        return {
          status: 500,
          message: 'Valami hiba történt',
        };
      }
    }

    return {
      status: 200,
      message: 'Bejelentkezve!',
      token: accessToken,
      userId: user.id,
      firstName: user.firstName,
      role: user.role,
    };
  },
};
