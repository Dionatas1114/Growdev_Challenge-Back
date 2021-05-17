import Sequelize from 'sequelize';
import 'dotenv/config';
import dataBaseConfig from '../config/database';

import Class from '../app/models/Class';
import User from '../app/models/User';
import Growdever from '../app/models/Growdever';
import ClassGrowdever from '../app/models/ClassGrowdever';

const models = [Class, User, Growdever, ClassGrowdever];
class Database {
  constructor() {
    this.init();
  }

  init() {
    if (process.env.NODE_ENV === 'test') {
      this.connection = new Sequelize(dataBaseConfig);
    } else {
      this.connection = new Sequelize(process.env.DATABASE_URL, dataBaseConfig);
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
