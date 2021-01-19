const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    // GETs all open appointments
    const sqlText = `SELECT "AS".id, "AS".dotw, "AS".start_time, 
                    "AS".barber_id FROM "appointment_slots" AS "AS"
                    LEFT JOIN "user_appointment" AS UA
                    ON UA."appt_id" = "AS".id WHERE UA.appt_id 
                    IS NULL AND "barber_id" = $1 AND "AS".dotw = $2
                    ORDER BY start_time;`;
    const query = req.query
    // console.log('aptSlot router query id', query.id)
    // console.log('aptSlot router date', query.date)
    pool.query(sqlText, [req.query.id, req.query.date])
    .then((result) => {
        // console.log(`apptSlot router result.rows ${result.rows}`)
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('ERROR making apptSlot db GET query', error)
        res.sendStatus(500)
      })
});

module.exports = router;