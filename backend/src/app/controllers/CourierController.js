/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';

import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_id: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }
    req.body.email = req.body.email.toLowerCase();
    const userExists = await Courier.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({ error: 'Esse email já está cadastrado' });
    }
    const { id, name, email } = await Courier.create(req.body).catch((err) =>
      res.json({ error: err })
    );

    return res.json({ id, name, email });
  }

  async index(req, res) {
    const courier = await Courier.findAll({
      attributes: ['name', 'email', 'id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });
    return res.json(courier);
  }
}
export default new CourierController();
