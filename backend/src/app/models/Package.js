import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Package extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        delivered: {
          type: Sequelize.VIRTUAL,
          get() {
            return !!this.end_date;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Courier, { foreignKey: 'courier_id', as: 'courier' });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}
export default Package;
