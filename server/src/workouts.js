const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/workout', (req, res, next) => {
    db.query(
      'INSERT INTO WORKOUT (date, userName, uniId) VALUES (?,?,?)',
      [
        new Date(),
        req.body.user,
        req.body.uni
      ],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(result);
        }
      }
    );
  });

  router.post('/workout/data', (req, res, next) => {
    db.query(
      'INSERT INTO WORKOUT_DATA (workoutId, sportId, amount) VALUES (?,?,?)',
      [
        req.body.workout,
        req.body.sport,
        req.body.amount
      ],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/workout/data', function (req, res, next) {
    db.query(
      'SELECT sport.sportId, sport.name, sum(amount) as amount ' +
      'FROM workout AS workout ' +
      'JOIN workout_data AS wdata ON wdata.workoutId = workout.workoutId ' +
      'JOIN sport AS sport ON sport.sportId = wdata.sportId ' +
      'GROUP BY sportId ',
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/workout', function (req, res, next) {
    db.query(
      'SELECT uni.name AS uni , uni.uniId AS uniId, sport.sportId AS sportId, sport.name AS sport, sum(amount) as amount ' +
      'FROM workout AS workout ' +
      'JOIN workout_data AS wdata ON wdata.workoutId = workout.workoutId ' +
      'JOIN university AS uni ON uni.uniId = workout.uniId ' +
      'JOIN sport AS sport ON sport.sportId = wdata.sportId ' +
      'GROUP BY workout.uniId, sportId',
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  return router;
}
module.exports = createRouter;
