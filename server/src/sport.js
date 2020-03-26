const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.get('/api/sport', function (req, res, next) {
    db.query(
      'SELECT sportId as "sportId",name,unit FROM SPORT',
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  });

  return router;
}
module.exports = createRouter;
