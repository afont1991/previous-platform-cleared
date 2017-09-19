import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import Sequelize from 'sequelize';
import {dbConfig} from '../config/database';


let loadDb = function() {
  let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    logging: false,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  });

  let db = {};

  let modelPath = `${process.cwd()}/api/models`;

  let files = fs.readdirSync(modelPath);

  _.each(files, function(file) {
    if (file !== 'index.js') {
      let model = sequelize.import(path.join(modelPath, file));
      return db[model.name] = model;
    }
  });

  Object.keys(db).forEach((modelName) => {
    if('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })


  let mysqlDb = _.assign(db, {
    sequelize,
    Sequelize
  });

  return mysqlDb;
};

export default loadDb();
