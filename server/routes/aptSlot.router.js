const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    // GETs all open appointments
    const sqlText = `SELECT * FROM "appointment_slots" AS "AS"
                    LEFT JOIN "user_appointment" AS UA
                    ON UA."appt_id" = "AS".id WHERE UA.appt_id 
                    IS NULL;`;
    pool.query(sqlText)
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