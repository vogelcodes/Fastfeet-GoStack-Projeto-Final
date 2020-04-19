/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string(),
    });
    const valid = await schema.isValid(req.body);

    if (!valid) {
      return res.status(400).json({ error: 'Validação falhou' });
    }
    req.body.email = req.body.email.toLowerCase();
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não cadastrado' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
