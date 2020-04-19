import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Courier from '../app/models/Courier';
import Package from '../app/models/Package';
import Delivery_problem from '../app/models/Delivery_problem';

const models = [User, Recipient, File, Courier, Package, Delivery_problem];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnetion = mongoose.connect(
      'mongodb://localhost:27017/fastfeet',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
