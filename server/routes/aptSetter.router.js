const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Sets a new appointment
router.post('/', rejectUnauthenticated, (req, res, next) => {
    const user_id = req.body.user_id;
    const apt_id = req.body.apt_id;
    const date = req.body.date;
    const queryText = `INSERT INTO "user_appointment" (user_id, date, appt_id)
      VALUES ($1, $2, $3) RETURNING id`;
      pool.query(queryText, [user_id, date, apt_id])
      .then( (result) => {
        // nest a query to get the most recent data to compare and show on dom
        const queryText2 = `SELECT "U".first_name, "UA".date, "AS".start_time, 
                            "UA".id FROM "user_appointment" AS "UA"
                            JOIN "appointment_slots" AS "AS" ON "UA"."appt_id" = "AS".id
                            JOIN "user" AS "U" ON "U".id = "AS".barber_id 
                            WHERE "UA".id = $1;`
        pool.query(queryText2, [result.rows[0].id])
        .then( (result) => {
            res.send(result.rows[0])
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        }); 
    })
    .catch( (error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
  });

module.exports = router;