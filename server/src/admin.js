const express = require('express');

const adminToken = process.env.ADMIN_TOKEN;

function createRouter(db) {
  const router = express.Router();

  if (!adminToken) {
    throw new Error("Admin token not set");
  }

  router.use(function (req, res, next) {
    console.log(req.token);
    if (req.token !== adminToken) {
      res.sendStatus(401);
      return next('router');
    }
    next();
  });

  router.get('/api/admin/workout/:id', function (req, res, next) {
    db.query('SELECT * FROM WORKOUT AS workout JOIN WORKOUT_DATA AS wdata ON wdata.workoutId = workout.workoutId WHERE workout.workoutId=$1',
      [
        req.params.id
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

  router.get('/api/admin/workout/data/raw', function (req, res, next) {
    db.query('SELECT * FROM WORKOUT AS workout JOIN WORKOUT_DATA AS wdata ON wdata.workoutId = workout.workoutId;',
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

  router.get('/api/admin/workout/user/all', function (req, res, next) {
    db.query('SELECT workout.username,name,sum(amount) ' +
      'FROM workout ' +
      'NATURAL JOIN university ' +
      'NATURAL JOIN workout_data ' +
      'GROUP BY username,name ' +
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

  router.get('/api/admin/workout/user/today', function (req, res, next) {
    db.query('SELECT workout.username,name,sum(amount) ' +
      'FROM workout ' +
      'NATURAL JOIN university ' +
      'NATURAL JOIN workout_data ' +
      'WHERE date = current_date::date ' +
      'GROUP BY username,name ' +
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

  router.delete('/api/admin/workout/:id', (req, res, next) => {
    db.query(
      'DELETE FROM WORKOUT WHERE workoutId=$1;',
      [
        req.params.id
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

// see admin.js for token checks
  express().use('/api/admin/', router, function (req, res) {
    res.sendStatus(401)
  });

  return router;
}

module.exports = createRouter;
