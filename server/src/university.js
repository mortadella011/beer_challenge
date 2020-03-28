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

  return router;
}
module.exports = createRouter;
