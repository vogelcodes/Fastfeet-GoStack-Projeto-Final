/* eslint-disable class-methods-use-this */
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const { user } = req.body;
    const list = await Notification.find({ user })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(list);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
