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

  router.get('/workout', function (req, res, next) {
    db.query(
      'SELECT * FROM WORKOUT_DATA',
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
