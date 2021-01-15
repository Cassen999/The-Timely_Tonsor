const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GETs all open appointments
    const sqlText = `SELECT * FROM "appointment_slots" AS "AS"
                    LEFT JOIN "user_appointment" AS UA
                    ON UA."appt_id" = "AS".id WHERE UA.appt_id 
                    IS NULL AND "barber_id" = $1;`;
    const id = req.params.id
    const date = req.body.date
    console.log('aptSlot router date=', req.body.date)
    console.log(req.params.id)
    pool.query(sqlText, [id])
    .then((result) => {
        console.log(`apptSlot router result.rows ${result.rows}`)
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('ERROR making apptSlot db GET query', error)
        res.sendStatus(500)
      })
});

module.exports = router;