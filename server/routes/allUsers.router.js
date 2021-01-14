const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "user"`
  pool.query(sqlText)
  .then((result) => {
    res.send(result.rows)
    console.log(result.rows)
  })
  .catch((error) => {
    console.log('ERROR making user db GET query', error)
    res.sendStatus(500)
  })
});

module.exports = router;