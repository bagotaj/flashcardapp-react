import { loginService } from '../services/loginService';

export const loginController = {
  async post(req, res) {
    const data = await loginService.loginUser(req.body);
    return res.status(data.status).json(data.body);
  },
};
