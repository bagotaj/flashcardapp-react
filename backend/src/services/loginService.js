import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { loginValidation } from '../loginValidation';
import User from '../models/User';

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
        message: 'Email is not registered',
      };
    }

    const validPass = await bcrypt.compare(loginData.password, user.password);
    if (!validPass) {
      return {
        status: 400,
        message: 'Username or password is incorrect',
      };
    }

    const authToken = jwt.sign(
      { firstName: user.firstName, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );
    return {
      status: 200,
      message: 'Logged in!',
      token: authToken,
      firstName: user.firstName,
      role: user.role,
    };
  },
};
