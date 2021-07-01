const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const {
    rejectUnauthorized,
} = require('../modules/coachAuthorization-middleware');

// Handles POST request with new user data
// This is the end point used when a coach
// adds a new client to their team
router.post('/create-client', rejectUnauthorized, (req, res,) => {
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
});

router.post('/toggle-building-block', rejectUnauthorized, async (req, res) => {
    const blockId = req.body.block_id;
    const userId = req.body.user_id;

    const queryText1 = `
    SELECT * 
    FROM "user_blocks" 
    WHERE building_block_id = $1 AND "user_id" = $2;`

    const queryText2 = `
    UPDATE "user_blocks" 
    SET is_recommended = $1 
    WHERE building_block_id = $2 AND "user_id" = $3`

    const queryText3 = `
    INSERT INTO user_blocks ("user_id", building_block_id, is_recommended)
    VALUES ($1, $2, true);`;

    const client = await pool.connect();
    try {
        const checkBlock = await client.query(queryText1, [blockId, userId]);
        if (checkBlock.rows[0]) {
            if (checkBlock.rows[0].is_recommended === false) {
                await client.query(queryText2, [true, blockId, userId]);
            } else {
                await client.query(queryText2, [false, blockId, userId]);
            }
        } else {
            await client.query(queryText3, [userId, blockId]);
        }
        res.sendStatus(200);
    } catch (err) {
        console.log(`IN /coach/toggle-building-block ${err}`);
    } finally {
        client.release();
    }
});

// Handles GET request for users that are
// associated with a particular coach
router.get('/client-list/:id?', rejectUnauthorized, (req, res) => {
    let coachId;
    if (req.params.id) {
        coachId = req.params.id
    } else {
        // Get coach id from req.user
        coachId = req.user.id;
    }
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
});

router.get('/client-pyramid/:id', rejectUnauthorized, async (req, res) => {
    const clientId = req.params.id;

    const queryText1 = `SELECT u.industry_pyramid FROM "user" u WHERE id = $1;`;

    const queryText2 = `
    SELECT bb.id, bb.name, ipbb.industry_pyramid_id, ub.is_recommended 
    FROM building_block bb
    JOIN industry_pyramid_building_block ipbb ON bb.id = ipbb.building_block_id
    LEFT JOIN "user_blocks" ub 
        ON ub.building_block_id = bb.id
        AND ub.user_id = $1
    WHERE ipbb.industry_pyramid_id = $2;`

    const client = await pool.connect();
    try {
        let pyramidId = await client.query(queryText1, [clientId]);
        pyramidId = pyramidId.rows[0].industry_pyramid;
        const pyramidData = await client.query(queryText2, [clientId, pyramidId]);
        res.send(pyramidData.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

router.put('/deactivate-client/:id', rejectUnauthorized, (req, res) => {
    const clientId = req.params.id;
    const queryText = `UPDATE "user" u SET is_active=false WHERE u.id=$1`
    pool
        .query(queryText, [clientId])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log(`IN deactivate-client router: ${err}`);
        });
});

router.put('/activate-client/:id', rejectUnauthorized, (req, res) => {
    const clientId = req.params.id;
    const queryText = `UPDATE "user" u SET is_active=true WHERE u.id=$1`
    pool
        .query(queryText, [clientId])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log(`IN activate-client router: ${err}`);
        });
});

router.get('/unapproved_Exp/:id', rejectUnauthorized, (req, res) => {
    const user_id = req.params.id;
    let queryText = ` SELECT * FROM critical_experience
    JOIN user_blocks on user_blocks.id = critical_experience.user_blocks_id
    JOIN building_block on building_block.id = user_blocks.building_block_id
	WHERE user_blocks.user_id = $1 AND critical_experience.is_approved = false;`
    pool.query(queryText, [user_id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('Unable to retrieve critical experiences', error);
    })
});

router.post('/add_coach_comments', rejectUnauthorized, (req, res) => {
    const coach_comments = req.body.coach_comments;
    const critical_experience_id = req.body.id;
    let queryText = `UPDATE "critical_experience"
    SET coach_comments = $1
    WHERE id = $2;`;
    pool.query(queryText, [coach_comments, critical_experience_id])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log(`Error in /api/coach/add_coach_comments`, err);
            res.sendStatus(500);
        })
});

module.exports = router;