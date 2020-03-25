const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const workouts = require('./workouts');
const university = require('./university');
const sport = require('./sport');

const db_conn_args = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'esn',
  password: process.env.DB_PASSWORD || 'esn_corona_2020',
  database: process.env.DB_NAME || 'esn_corona'
}
console.log(`Connecting to`,db_conn_args)

const connection = mysql.createConnection(db_conn_args);

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(workouts(connection))
  .use(university(connection))
  .use(sport(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
