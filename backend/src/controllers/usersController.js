import User from '../models/User';
import { userService } from '../services/userService';

export const usersController = {
  get(req, res) {
    try {
      User.find().then(foundUsers => res.status(200).json(foundUsers));
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async getId(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await userService.updateUser(id, reqData);
    res.status(data.status).json(data);
  },
};
