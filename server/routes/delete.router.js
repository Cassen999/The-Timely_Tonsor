const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id
    const sqlText = `DELETE FROM "user_appointment" WHERE appt_id = $1;`
    pool.query(sqlText, [id])
      .then(result => {
        console.log('DELETE router result', result.rows)
        res.sendStatus(201)
      })
      .catch(err => {
        console.log('ERROR in DELETE shelf router', err)
        res.sendStatus(500)
      })
  });

module.exports = router;