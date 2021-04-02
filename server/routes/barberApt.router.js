const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/', rejectUnauthenticated, (req, res) => {
    let id = req.query.id
    let date = req.query.date
    const sqlText = `SELECT "date", "start_time", "first_name", "U"."id",
                      "appt_id", "last_name", "phone_number"
                      FROM "appointment_slots" AS "AS"
                      JOIN "user_appointment" AS UA ON 
                      UA."appt_id" = "AS".id 
                      JOIN "user" AS "U" ON UA."user_id" = "U".id 
                      WHERE barber_id = $1 AND UA.date = $2
                      ORDER BY "AS"."start_time" ASC;`
    pool.query(sqlText, [id, date])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('ERROR making UA db GET query', error)
      res.sendStatus(500)
    })
  });

  router.get('/aptDetails', rejectUnauthenticated, (req, res) => {
    let aptSlot_id = Number(req.query.aptSlot_id)
    console.log(aptSlot_id)
    // let user_id = req.query.user_id
    const sqlText = `SELECT "UA".id, "UA".user_id, "user".first_name, 
                      "user".last_name, "user".phone_number, 
                      "AS".dotw, "AS".start_time, "UA".date
                      FROM "user_appointment" AS "UA"
                      JOIN "user" ON "user".id = "UA".user_id
                      JOIN "appointment_slots" AS "AS" ON "AS".id = "UA".appt_id
                      WHERE "AS".id = $1;`
    pool.query(sqlText, [aptSlot_id])
    .then((result) => {
      res.send(result.rows)
      console.log('aptDetails result.rows', result.rows)
    })
    .catch((error) => {
      console.log('ERROR making aptDetails get', error)
      res.sendStatus(500)
    })
  });


module.exports = router;

