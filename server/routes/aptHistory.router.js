const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id
    console.log('apt history router user id ', req.params.id)
    const sqlText = `SELECT "first_name", "start_time", "date", "appt_id" FROM "user" AS "U" 
                      JOIN "appointment_slots" AS "AS" ON "U".id = "AS".barber_id
                      JOIN "user_appointment" AS "UA" ON "UA".appt_id = "AS".id
                      WHERE "UA".user_id = $1
                      ORDER BY "date" DESC 
                      LIMIT 10;`
    pool.query(sqlText, [id])
    .then((result) => {
      res.send(result.rows)
      console.log(result.rows)
    })
    .catch((error) => {
      console.log('ERROR making apt history query', error)
      res.sendStatus(500)
    })
  });


module.exports = router;