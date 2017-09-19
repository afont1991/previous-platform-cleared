require('dotenv').config();
import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import session from 'express-session'
import sequelizeStore from 'connect-session-sequelize'
import cookieParser from 'cookie-parser'

import { routes } from './api/config/routes';
import database from './api/models/index';
import passportConfig from './api/config/passport'

global.database = database;

import epilogue from './api/config/epilogue'

AWS.config.setPromisesDependency(null);
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

global.S3 = new AWS.S3();

// Express set up
let app = express()
let SequelizeStore = sequelizeStore(session.Store)

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(fileUpload())
// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.SITE_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true)
  next();
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: global.database.sequelize
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}))


app.use(express.static('./build'));

passportConfig(app)

// API Routes Below
routes(app, (app)=> {

  epilogue(app)
  // Serving Frontend
  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });

  const port = process.env.PORT || 9000;
  global.database.sequelize.sync().then(() => app.listen(port))

  console.log("I am Server. Hear me listening on port: " + port);
});
