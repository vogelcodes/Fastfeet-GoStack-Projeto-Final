/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }
    req.body.email = req.body.email.toLowerCase();
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'Esse email já está cadastrado' });
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(2),
      email: Yup.string().email(),
      password: Yup.string().min(6),
      avatar_id: Yup.number(),
      oldPassword: Yup.string()
        .when('password', (password, field) =>
          password ? field.required() : field
        )
        .when('email', (email, field) => (email ? field.required() : field)),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    const valid = await schema.isValid(req.body);

    if (!valid) {
      return res.status(400).json({ error: 'Validação falhou' });
    }
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    /* forçar o email em minusculas */

    if (email && email !== user.email) {
      const usedEmail = await User.findOne({ where: { email } });
      if (usedEmail) {
        return res.status(401).json({ error: 'Email já cadastrado' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name, provider } = await user
      .update(req.body)
      .catch((err) => res.json({ error: err }));

    return res.json({ id, name, email, provider });
  }
}
export default new UserController();
