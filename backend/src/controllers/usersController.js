import User from '../models/User';

export const usersController = {
  get(req, res) {
    try {
      User.find().then(foundUsers => res.status(200).json(foundUsers));
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
