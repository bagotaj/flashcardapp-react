import { userService } from '../services/userService';

export const usersController = {
  async get(req, res) {
    const data = await userService.getUsers();
    res.status(data.status).send(data.body);
  },

  async getId(req, res) {
    const { id } = req.params;

    const data = await userService.getUserById(id);
    res.status(data.status).send(data.body);
  },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await userService.updateUser(id, reqData);
    res.status(data.status).send(data.message);
  },

  async delete(req, res) {
    const deleteId = req.params.id;

    const data = await userService.deleteUserById(deleteId);
    res.status(data.status).send(data.message);
  },
};
