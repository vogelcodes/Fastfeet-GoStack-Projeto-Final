/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Courier from '../models/Courier';

class SigninController {
  async post(req, res) {
    const schema = Yup.object().shape({
      email: Yup.number(),
    });
    const valid = await schema.isValid(req.body);

    if (!valid) {
      return res.status(400).json({ error: 'Validação falhou' });
    }
    const { id } = req.body;
    const response = await Courier.findOne({ where: { id } });
    if (!response) {
      return res.status(401).json({ error: 'Usuário não cadastrado' });
    }
    return res.json(response);
  }
}
export default new SigninController();
