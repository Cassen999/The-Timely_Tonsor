const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res, next) => {
    const user_id = req.body.user_id;
    const apt_id = req.body.apt_id;
    const date = req.body.date;
    const queryText = `INSERT INTO "user_appointment" (user_id, date, appt_id)
      VALUES ($1, $2, $3) RETURNING id`;
      pool.query(queryText, [user_id, date, apt_id])
      .then( (result) => {
        // nest a query to get the most recent data to compare and show on dom
        const queryText2 = `SELECT * FROM "user_appointment" WHERE id = $1;`
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