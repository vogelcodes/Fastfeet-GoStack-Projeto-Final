import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Delivery_problem extends Model {
  static init(sequelize) {
    super.init(
      {
        package_id: Sequelize.NUMBER,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Package, { foreignKey: 'package_id', as: 'package' });
  }
}
export default Delivery_problem;
