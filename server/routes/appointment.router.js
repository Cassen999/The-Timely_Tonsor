const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/', rejectUnauthenticated, (req, res) => {
    let id = req.body.id
    console.log('apt router barber id ', req.body.id)
    const sqlText = `SELECT * FROM "appointment_slots" AS "AS"
                      JOIN "user_appointment" AS UA
                      ON UA."appt_id" = "AS".id WHERE barber_id = $1;`
    pool.query(sqlText, [id])
    .then((result) => {
      res.send(result.rows)
      console.log(result.rows)
    })
    .catch((error) => {
      console.log('ERROR making UA db GET query', error)
      res.sendStatus(500)
    })
  });


module.exports = router;

