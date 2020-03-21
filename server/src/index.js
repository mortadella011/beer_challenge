const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const workouts = require('./workouts');
const university = require('./university');
const sport = require('./sport');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'esn',
  password: 'esn_corona_2020',
  database: 'esn_corona'
});

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
