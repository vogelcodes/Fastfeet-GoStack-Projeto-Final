/* eslint-disable class-methods-use-this */
import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { pkg, formattedDate } = data;
    await Mail.sendMail({
      to: `${pkg.courier.name} <${pkg.courier.email}>`,
      subject: 'Entrega Concluída',
      template: 'success',
      context: {
        courier: pkg.courier.name,
        recipient: `${pkg.recipient.name} de ${pkg.recipient.city}`,
        date: formattedDate,
      },
    });
  }
}

export default new DeliveryMail();
