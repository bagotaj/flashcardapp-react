import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logger';

import { loginValidation } from '../validators/loginValidation';
import { User, Admin } from '../models/User';
import { Ranks } from '../models/Ranks';

export const loginService = {
  async loginUser(loginData) {
    const { location, ...others } = loginData;

    const { error } = loginValidation(others);
    if (error) {
      return {
        status: 401,
        body: { message: error.details[0].message },
      };
    }

    let user;

    if (location === '/login') {
      user = await User.findOne({ email: loginData.email });
    } else {
      user = await Admin.findOne({ email: loginData.email });
    }

    if (!user) {
      return {
        status: 400,
        body: { message: 'Az email cím még nincs regisztrálva' },
      };
    }

    const validPass = await bcrypt.compare(loginData.password, user.password);
    if (!validPass) {
      return {
        status: 403,
        body: { message: 'Az email cím vagy a jelszó nem megfelelő' },
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
          body: { message: 'Valami hiba történt' },
        };
      }
    }

    return {
      status: 200,
      body: {
        message: 'Bejelentkezve!',
        token: accessToken,
        userId: user.id,
        firstName: user.firstName,
        role: user.role,
      },
    };
  },
};
