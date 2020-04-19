/* eslint-disable class-methods-use-this */
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { pkg, formattedDate } = data;
    await Mail.sendMail({
      to: `${pkg.courier.name} <${pkg.courier.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        courier: pkg.courier.name,
        recipient: `${pkg.recipient.name} de ${pkg.recipient.city}`,
        date: formattedDate,
      },
    });
  }
}

export default new CancellationMail();
