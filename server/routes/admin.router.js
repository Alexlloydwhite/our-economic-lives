const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/career_path', (req, res) => {
    let queryText = `SELECT * FROM career_path;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in /api/admin/career_path', error);
            res.sendStatus(500);
        })
});

router.post('/create_coach', (req, res) => {
    console.log(`IN, create route`);
    const email = req.body.email;
    const password = encryptLib.encryptPassword(req.body.password);
    const authorization = 2;
    const queryText = `INSERT INTO "user" (email, password, "authorization")
      VALUES ($1, $2, $3)`;
    pool
      .query(queryText, [email, password, authorization])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
});

module.exports = router;