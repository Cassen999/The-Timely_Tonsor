const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // Gets all open appointments for all barbers
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "user" WHERE "is_barber" = true;`;
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('ERROR making barber db GET query', error)
        res.sendStatus(500)
      })
});

module.exports = router;