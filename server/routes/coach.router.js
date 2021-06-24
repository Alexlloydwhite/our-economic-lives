const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles GET request for users that are
// associated with a particular coach
router.get('/', (req, res) => {
    // Get coach id from req.user
    const coachId = req.user.id;
    const queryText = `
    SELECT * 
    FROM "user" u
    WHERE u.coach_id=$1;`;
    pool
        .query(queryText, [coachId])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log(`IN /api/coach GET router. ${err}`);
        });
});

module.exports = router;