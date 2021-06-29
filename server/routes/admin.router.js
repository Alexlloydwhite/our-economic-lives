const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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

router.post('/create_industry_pyramid', (req, res) => {
  if (req.user.authorization === 1) {
    console.log(req.body.name);
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
  } else {
    res.sendStatus(403);
  }
});

router.post('/create_coach', (req, res) => {
  if (req.user.authorization === 1) {
    console.log(`IN, create route`);
    const firstName = req.body.first_name;
    const lastName = req.body.last_name
    const email = req.body.email;
    const password = encryptLib.encryptPassword(req.body.password);
    const authorization = 2;
    const queryText = `INSERT INTO "user" (first_name, last_name, email, password, "authorization")
        VALUES ($1, $2, $3, $4, $5);`;
    pool
      .query(queryText, [firstName, lastName, email, password, authorization])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('adding new coach failed: ', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.get('/coach-list', (req, res) => {
  if (req.user.authorization === 1) {
    const queryText = `
    SELECT 
      u.id,
      u.email,
      u.first_name,
      u.last_name
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
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;