const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/', rejectUnauthenticated, (req, res) => {
    let id = 1
    console.log('apt router barber id ', req.body)
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

router.post('/', rejectUnauthenticated, (req, res) => {
  const user_id = req.body.user_id;
  const date = req.body.date;
  const apt_id = req.body.apt_id;
  console.log(req.body)
  const sqlText = `INSERT INTO "user_appointment" ("user_id", "date", "apt_id")
                    VALUES ($1, $2, $3);`
  // pool.query(sqlText, [user_id, date, apt_id])
  // .then(() => res.sendStatus(201))
  // .catch((err) => {
  //   console.log('User registration failed: ', err);
  //   res.sendStatus(500);
  // });
})

module.exports = router;

