import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import Package from '../models/Package';
import Delivery_problem from '../models/Delivery_problem';

import Queue from '../../lib/Queue';
import DeliveryMail from '../jobs/DeliveryMail';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

/* eslint-disable class-methods-use-this */
class DeliveryController {
  async index(req, res) {
    let delivered = false;
    if (req.query.delivered) {
      if (req.query.delivered == 'false' || 0 || undefined) {
        delivered = false;
      } else {
        delivered = true;
      }
    }
    const list = await Package.findAll({
      where: {
        courier_id: req.params.id,
      },
    });
    const filteredList = list.filter(function (pkg) {
      return pkg.delivered == delivered;
    });
    res.json(filteredList);
  }

  async store(req, res) {
    const issue = await Delivery_problem.create(req.body);
    res.json(issue);
  }

  async update(req, res) {
    const { id, signature_id } = req.body;
    const pkg = await Package.findByPk(id, {
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

    await pkg.update({ signature_id, end_date: new Date() });
    const formattedDate = format(pkg.end_date, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });
    await Queue.add(DeliveryMail.key, {
      pkg,
      formattedDate,
    });

    res.json(pkg);
  }

  async delete(req, res) {
    const issue = await Delivery_problem.findByPk(req.params.id);
    const pkg = await Package.findByPk(issue.package_id);
    if (pkg.end_date) {
      return res
        .status(400)
        .json({ error: 'Impossível Cancelar: Encomenda já entregue' });
    }
    await pkg.update({ canceled_at: new Date() });
    return res.json({ status: pkg });
  }
}
export default new DeliveryController();
