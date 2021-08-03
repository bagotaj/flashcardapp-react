import bcrypt from 'bcryptjs';
import logger from '../logger';
import { User } from '../models/User';
import { registerValidation } from '../validators/registerValidation';

export const registrationService = {
  async saveUser(userData) {
    const { error } = registerValidation(userData);
    if (error) {
      return {
        status: 401,
        message: error.details[0].message,
      };
    }
    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist)
      return {
        status: 400,
        message: 'Az email cím már regisztrálva van',
      };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
      userName: userData.firstName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
    });

    try {
      await user.save();
      return {
        status: 200,
        message: 'A felhasználó mentése sikerült',
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
