const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const {
  rejectUnauthorized,
} = require('../modules/adminAuthorization-middleware');


//route to get the list of industry_pyramids
router.get('/industry_pyramid', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM industry_pyramid;`
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error in /api/admin/industry_pyramid', error);
      res.sendStatus(500);
    })
});

//route to create the name of an industry pyramid
router.post('/create_industry_pyramid', rejectUnauthorized, (req, res) => {
  const industryPyramidName = req.body.name;
  const queryText = `INSERT INTO industry_pyramid (name) VALUES ($1);`;
  pool
    .query(queryText, [industryPyramidName])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(`IN /admin/create_industry_pyramid, ${err}`);
    })
});

//route to create a coach
router.post('/create_coach', rejectUnauthorized, (req, res) => {
  const organization = req.body.organization_name
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const phoneNumber = req.body.phone_number;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const authorization = 2;
  const queryText = `
    INSERT INTO "user" (
      organization_name,
      first_name, 
      last_name, 
      phone_number,
      email, 
      password, 
      "authorization")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [
      organization,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      authorization
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('adding new coach failed: ', err);
      res.sendStatus(500);
    });
});

// route to create an admin through postman or a similar service
// router.post('/create_admin', (req, res) => {
//   const firstName = req.body.first_name;
//   const lastName = req.body.last_name
//   const email = req.body.email;
//   const password = encryptLib.encryptPassword(req.body.password);
//   const authorization = 1;
//   const queryText = `INSERT INTO "user" (first_name, last_name, email, password, "authorization")
//         VALUES ($1, $2, $3, $4, $5);`;
//   pool
//     .query(queryText, [firstName, lastName, email, password, authorization])
//     .then(() => res.sendStatus(201))
//     .catch((err) => {
//       console.log('adding new coach failed: ', err);
//       res.sendStatus(500);
//     });
// });

//router to get the list of coaches that exist in the database
router.get('/coach-list', rejectUnauthorized, (req, res) => {
  const queryText = `
    SELECT 
      u.id,
      u.email,
      u.first_name,
      u.last_name,
      u.organization_name,
      u.phone_number
    FROM "user" u
    WHERE u.authorization=2;
    `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(`IN /admin/coach-list. ERROR getting list of coaches ${err}`);
    })
});

module.exports = router;