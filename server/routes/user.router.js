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
  res.send(req.user);
});

// Handles POST request with new user data
// This is the end point used when a coach
// adds a new client to their team
router.post('/create', (req, res, next) => {
  console.log(`IN, create route`);
  const email = req.body.email;
  const authorization = 3;
  const password = encryptLib.encryptPassword(req.body.password);
  const coachId = req.user.id;
  const queryText = `INSERT INTO "user" (email, password, "authorization", coach_id)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [email, password, authorization, coachId])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles PUT request, this is the end point
// used when a new user logins in for the first time
router.put('/register', (req, res) => {
  console.log(req.body, req.user.id);
  const queryText = `
  UPDATE "user" 
  SET 
    first_name=$1, 
    last_name=$2,
    phone_number=$3,
    city=$4,
    current_profession=$5,
    desired_career=$6,
    is_registered='true'
  WHERE id=$7`
  pool
    .query(queryText, [
      req.body.firstName,
      req.body.lastName,
      req.body.phoneNumber,
      req.body.cityOfResidence,
      req.body.currentProfession,
      req.body.careerPyramid,
      req.user.id
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.sendStatus(500);
      console.log(`error registering user: ${err}`);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
