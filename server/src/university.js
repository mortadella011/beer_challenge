const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.get('/api/university', function (req, res, next) {
    db.query(
      'SELECT uniId as "uniId",name FROM UNIVERSITY as uni order by uni.name ',
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

  router.get('/api/admin/workout/uni/all', function (req, res, next) {
    db.query('SELECT name,sum(amount) ' +
      'FROM workout ' +
      'NATURAL JOIN university ' +
      'NATURAL JOIN workout_data ' +
      'GROUP BY name ' +
      'ORDER BY SUM(amount) DESC ' +
      'LIMIT $1;',
      [
        req.query.limit
      ],
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

  router.get('/api/admin/workout/uni/today', function (req, res, next) {
    db.query('SELECT name,sum(amount) ' +
      'FROM workout ' +
      'NATURAL JOIN university ' +
      'NATURAL JOIN workout_data ' +
      'WHERE date = current_date::date ' +
      'GROUP BY name ' +
      'ORDER BY SUM(amount) DESC ' +
      'LIMIT $1;',
      [
        req.query.limit
      ],
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
