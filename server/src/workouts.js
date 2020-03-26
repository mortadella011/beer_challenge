const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/api/workout', (req, res, next) => {
    db.query(
      'INSERT INTO WORKOUT (date, userName, uniId) VALUES ($1,$2,$3) RETURNING workoutId as "workoutId";',
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
          res.header("Content-Type", "application/json; charset=utf-8");
          res.status(200).json(result.rows[0]);
        }
      }
    );
  });

  router.post('/api/workout/data', (req, res, next) => {
    db.query(
      'INSERT INTO WORKOUT_DATA (workoutId, sportId, amount) VALUES ($1,$2,$3)',
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
          res.header("Content-Type", "application/json; charset=utf-8");
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/api/workout/data', function (req, res, next) {
    db.query(
      'SELECT sport.sportId as "sportId", sport.name, sum(amount) as amount ' +
      'FROM WORKOUT AS workout ' +
      'JOIN WORKOUT_DATA AS wdata ON wdata.workoutId = workout.workoutId ' +
      'JOIN SPORT AS sport ON sport.sportId = wdata.sportId ' +
      'GROUP BY sport.sportId, sport.name',
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.header("Content-Type", "application/json; charset=utf-8");
          res.status(200).json(results.rows);
        }
      }
    );
  });

  router.get('/api/workout', function (req, res, next) {
    db.query('SELECT uni.name AS uni, uni.uniId AS "uniId", sport.sportId AS "sportId", sport.name AS sport, sum(amount) as amount ' +
    'FROM WORKOUT AS workout ' +
    'JOIN WORKOUT_DATA AS wdata ON wdata.workoutId = workout.workoutId ' +
    'JOIN UNIVERSITY AS uni ON uni.uniId = workout.uniId ' +
    'JOIN SPORT AS sport ON sport.sportId = wdata.sportId ' +
    'GROUP BY workout.uniId, wdata.sportId, uni.name, uni.uniId, sport.sportId, sport.name'
      ,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.header("Content-Type", "application/json; charset=utf-8");
          res.status(200).json(results.rows);
        }
      }
    );
  });

  return router;
}
module.exports = createRouter;
