const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

// Handles POST request with new user data
// This is the end point used when a coach
// adds a new client to their team
router.post('/create-client', (req, res,) => {
    if (req.user.authorization <= 2) {
        console.log(`IN, /create-client route`);
        const email = req.body.email;
        const password = encryptLib.encryptPassword(req.body.password);
        const authorization = 3;
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
    } else {
        res.sendStatus(403);
    }
});

// Handles GET request for users that are
// associated with a particular coach
router.get('/client-list/:id', (req, res) => {
    if (req.user.authorization <= 2) {
        // Get coach id from req.user
        const coachId = req.params.id;
        const queryText = `
    SELECT 
        u.id,
        u.organization_name,
        u.email,
        u.first_name,
        u.last_name,
        u.phone_number,
        u.city,
        u.authorization,
        u.coach_id,
        u.current_profession,
        u.industry_pyramid,
        u.is_registered,
        u.is_active
    FROM "user" u
    WHERE u.coach_id=$1
    ORDER BY 
        u.is_registered DESC,
        u.last_name ASC,
        u.first_name ASC;`;
        pool
            .query(queryText, [coachId])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                res.sendStatus(500);
                console.log(`IN /api/coach GET router. ${err}`);
            });
    } else {
        res.sendStatus(403);
    }

});

router.put('/deactivate-client/:id', (req, res) => {
    if (req.user.authorization <= 2) {
        const clientId = req.params.id;
        const queryText = `UPDATE "user" u SET is_active=false WHERE u.id=$1`
        pool
            .query(queryText, [clientId])
            .then(() => res.sendStatus(201))
            .catch((err) => {
                console.log(`IN deactivate-client router: ${err}`);
            });
    } else {
        res.sendStatus(403);
    }
});

router.put('/activate-client/:id', (req, res) => {
    if (req.user.authorization <= 2) {
        const clientId = req.params.id;
        const queryText = `UPDATE "user" u SET is_active=true WHERE u.id=$1`
        pool
            .query(queryText, [clientId])
            .then(() => res.sendStatus(201))
            .catch((err) => {
                console.log(`IN activate-client router: ${err}`);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;