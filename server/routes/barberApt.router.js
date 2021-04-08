const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // Used to get logged in barber's scheduled appointments
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

  // Used when a barber clicks an appointment on their schedule
  router.get('/aptDetails', rejectUnauthenticated, (req, res) => {
    let aptSlot_id = Number(req.query.aptSlot_id)
    const sqlText = `SELECT "UA".id, "UA".user_id, "user".first_name, 
                      "user".last_name, "user".phone_number, "user".notes,
                      "AS".dotw, "AS".start_time, "UA".date, "UA".appt_id
                      FROM "user_appointment" AS "UA"
                      JOIN "user" ON "user".id = "UA".user_id
                      JOIN "appointment_slots" AS "AS" ON "AS".id = "UA".appt_id
                      WHERE "AS".id = $1;`
    pool.query(sqlText, [aptSlot_id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('ERROR making aptDetails get', error)
      res.sendStatus(500)
    })
  });

  // Used to edit a customer's notes
  router.put('/notes', (req,res) => {
    console.log('In router.put')
    const id = req.body.user_id;
    const notes = req.body.notes
    const sqlText = `UPDATE "user" SET notes=$1 WHERE id=${id} 
      RETURNING notes;`
    pool.query(sqlText, [notes])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('Error in router.post', error)
      res.sendStatus(500)
    })
  })


module.exports = router;

