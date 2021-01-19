const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GETs barber name of the appointment being confirmed
    const id = req.params.id
    const sqlText = `SELECT "first_name" FROM "user" AS "U"
                        JOIN "appointment_slots" AS "AS" ON "U".id = "AS".barber_id
                        JOIN "user_appointment" AS "UA" ON "AS".id = "UA".appt_id
                        WHERE "UA".appt_id = $1;`;
    console.log('ConfirmTimeGet req.body', req.params.id)
    pool.query(sqlText, [id])
    .then((result) => {
      console.log('ConfirmBarberGet router result.rows', result.rows)
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('ConfirmBarberGet error', error)
      res.sendStatus(500)
    })
});

module.exports = router;