const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GETs time and barber name of the appointment being confirmed
    const id = req.params.id
    const sqlText = `SELECT "start_time" FROM "appointment_slots" AS "AS"
                      JOIN "user_appointment" AS "UA" ON "UA".appt_id = "AS".id
                      WHERE "UA".id = $1;`;
    console.log('ConfirmTimeGet req.body', req.params.id)
    pool.query(sqlText, [id])
    .then((result) => {
      console.log('ConfirmTimeGet router result.rows', result.rows)
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('ConfirmTimeGet error', error)
      res.sendStatus(500)
    })
});

module.exports = router;