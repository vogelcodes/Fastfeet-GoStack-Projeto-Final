/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import {
  getHours,
  parseISO,
  isBefore,
  getDate,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Mail from '../../lib/Mail';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class PackageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }
    const { recipient_id, courier_id } = req.body;
    const recipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });
    const courierExists = await Courier.findOne({
      where: { id: courier_id },
    });
    if (!recipientExists) {
      return res.status(400).json({ error: 'Destinatário inexistente' });
    }
    if (!courierExists) {
      return res.status(400).json({ error: 'Entregador inexistente' });
    }

    const pkg = await Package.create(req.body);

    const recipient = await Recipient.findByPk(recipient_id);
    const formattedDate = format(pkg.createdAt, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Nova encomenda id: ${pkg.id}, ${pkg.product} de ${recipient.name} no dia ${formattedDate}`,
      user: recipient_id,
      read: false,
    });
    return res.json(pkg);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      product: Yup.string(),
      recipient_id: Yup.number(),
      courier_id: Yup.number().required(),
      start_date: Yup.date().when('end_date', (end_date, field) =>
        end_date ? field.required() : field
      ),
      signature_id: Yup.number(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    if (req.body.start_date) {
      const startDate = parseISO(req.body.start_date);
      if (isBefore(startDate, new Date())) {
        return res.status(400).json({ error: 'Data de retirada inválida' });
      }

      const hour = getHours(startDate);
      if (hour < 8 || hour >= 18) {
        return res
          .status(400)
          .json({ error: 'Horário de Retirada entre 08 e 18h' });
      }

      const { count, rows } = await Package.findAndCountAll({
        where: {
          courier_id: req.body.courier_id,
          start_date: {
            [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
          },
        },
      });
      const pkgInList = rows.find((x) => x.id === req.body.id);

      if (count >= 5 && !pkgInList) {
        return res
          .status(400)
          .json({ error: 'Limite de retiradas por dia atingido', pkgInList });
      }
    }
    const courierExists = await Courier.findOne({
      where: { id: req.body.courier_id },
    });
    if (!courierExists) {
      return res.status(400).json({ error: 'Entregador inexistente' });
    }

    const pkg = await Package.findByPk(req.body.id);
    if (!pkg) {
      return res.status(400).json({ error: 'Esta entrega não existe' });
    }

    const updatedpkg = await pkg.update(req.body);
    const formattedDate = format(
      updatedpkg.start_date,
      "dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Sua Encomenda id: ${updatedpkg.id}, ${updatedpkg.product} será retirada no dia ${formattedDate}`,
      user: updatedpkg.recipient_id,
      read: false,
    });

    return res.json(updatedpkg);
  }

  async index(req, res) {
    const list = await Package.findAll({
      attributes: [
        'id',
        'product',
        'createdAt',
        'signature_id',
        'delivered',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        { model: File, as: 'signature', attributes: ['url', 'path'] },
        { model: Courier, as: 'courier', attributes: ['id', 'name'] },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state'],
        },
      ],
    });
    function compareId(a, b) {
      const A = a.id;
      const B = b.id;

      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else if (A < B) {
        comparison = -1;
      }
      return comparison;
    }

    const pkglist = list.sort(compareId);
    return res.json(pkglist);
  }

  async delete(req, res) {
    const pkg = await Package.findByPk(req.params.id, {
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'city'],
        },
      ],
    });
    /* if (pkg.canceled_at) {
      return res.status(400).json({ error: 'Encomenda já cancelada' });
    } */
    pkg.canceled_at = new Date();
    await pkg.save();
    const formattedDate = format(
      pkg.canceled_at,
      "dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );
    await Queue.add(CancellationMail.key, {
      pkg,
      formattedDate,
    });
    await Notification.create({
      content: `Sua Encomenda id: ${pkg.id}, ${pkg.product} foi cancelada no dia ${formattedDate}`,
      user: pkg.recipient_id,
      read: false,
    });
    return res.json(pkg);
  }
}
export default new PackageController();
