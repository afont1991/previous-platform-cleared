import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import Sequelize from 'sequelize';
import {dbConfig} from '../config/database';

// Load Models
import CompanyModel from './CompanyModel';

let loadDb = function() {
  let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: 'mysql',
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
    if ((file !== 'index.js') && (file !== 'userModel.js')) {
      let model = sequelize.import(path.join(modelPath, file));
      return db[model.name] = model;
    }
  });


  let mysqlDb = _.assign(db, {
    sequelize,
    Sequelize
  });

  return mysqlDb;
};

export default loadDb();
