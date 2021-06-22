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
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/create', (req, res, next) => {
  const username = req.body.username;
  const authorization = req.body.authorization;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (email, password, "authorization")
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, authorization])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});
// "email" VARCHAR (80) UNIQUE NOT NULL,
// 	"password" VARCHAR (1000) NOT NULL,
// 	"first_name" VARCHAR (80),
// 	"last_name" VARCHAR (80),
// 	"phone_number" VARCHAR (80),
// 	"city" VARCHAR (80),
// 	"authorization" INT NOT NULL,
// 	"coach_id" INT,
// 	"current_profession" VARCHAR (80),
// 	"desired_career" INT,
// 	"is_registered" BOOLEAN DEFAULT FALSE

router.post('/register', (req,res) => {

  const queryText = `
  UPDATE "user" 
  SET 
    first_name=$1, 
    last_name=$2,
    phone_number=$3,
    city=$4,
    current_profession=$5
    desired_career=$6
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
