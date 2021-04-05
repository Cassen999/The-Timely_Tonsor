const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  console.log('req.user', req.user)
  res.send(req.user);
});

// Handles POST request with new user data
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const is_barber = req.body.is_barber;

  const queryText = `INSERT INTO "user" (username, password, first_name,
    last_name, phone_number, is_barber)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [username, password, first_name, last_name, 
      phone_number, is_barber])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});
// clears all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Updates user's edited profile info
router.put('/id', (req,res) => {
  const id = req.user.id;
  const sqlText = `UPDATE "user" SET username=$1, first_name=$2,
    last_name=$3, phone_number=$4 WHERE id=${id} 
    RETURNING id`
  pool.query(sqlText, [req.body.username, req.body.first_name, req.body.last_name, req.body.phone_number])
  .then((result) => {
    res.send(result.rows)
  })
  .catch((error) => {
    console.log('Error in router.post', error)
    res.sendStatus(500)
  })
})

module.exports = router;
