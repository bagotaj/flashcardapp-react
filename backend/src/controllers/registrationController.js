import { registrationService } from '../services/registrationService';

export const registrationController = {
  async post(req, res) {
    const data = await registrationService.saveUser(req.body);
    res.status(data.status).json(data);
  },
};
