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
})

module.exports = router;