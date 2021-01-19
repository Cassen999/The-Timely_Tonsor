const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id
    const sqlText = `DELETE FROM "user_appointment" WHERE id = $1;`
    pool.query(sqlText, [id])
      .then(result => {
        console.log('DELETE router result', result)
        res.sendStatus(201)
      })
      .catch(err => {
        console.log('ERROR in DELETE shelf router', err)
        res.sendStatus(500)
      })
  });

module.exports = router;