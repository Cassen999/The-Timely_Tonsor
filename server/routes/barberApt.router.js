const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/', rejectUnauthenticated, (req, res) => {
    let id = req.query.id
    let date = req.query.date
    console.log('apt router req.query ', req.query)
    const sqlText = `SELECT * FROM "appointment_slots" AS "AS"
                      JOIN "user_appointment" AS UA
                      ON UA."appt_id" = "AS".id WHERE barber_id = $1 AND UA.date = $2;`
    pool.query(sqlText, [id, date])
    .then((result) => {
      res.send(result.rows)
      console.log('barberApt result.rows', result.rows)
    })
    .catch((error) => {
      console.log('ERROR making UA db GET query', error)
      res.sendStatus(500)
    })
  });


module.exports = router;

