const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    // GETs all open appointments
    const sqlText = `SELECT * FROM "user" WHERE "is_barber" = true;`;
    pool.query(sqlText)
    .then((result) => {
        console.log(`barber router result.rows ${result.rows}`)
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('ERROR making barber db GET query', error)
        res.sendStatus(500)
      })
});

module.exports = router;