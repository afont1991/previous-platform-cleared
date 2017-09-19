require('dotenv').config()

let dbConfig;

// if(process.env.NODE_ENV === 'production'){
//   dbConfig = {
//     database: 'debtmaven',
//     host: '',
//     port: 3306,
//     username: 'api',
//     password: process.env.DB_password,
//   }
// }else {

dbConfig = {
  database: process.env.RDS_DB_NAME,
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
}

export { dbConfig }
