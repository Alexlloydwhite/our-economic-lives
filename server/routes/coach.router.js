const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const {
    rejectUnauthorized,
} = require('../modules/coachAuthorization-middleware');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//gets all the critical experience created by a specific user
router.get('/critical-experience/:id', rejectUnauthorized, (req, res) => {
    const queryText = `
    SELECT 
        cr.id, cr.user_text, cr.is_approved, cr.coach_comments, cr.user_blocks_id,
	    ub.building_block_id, ub.user_id, bb.name  
    FROM critical_experience cr
    JOIN user_blocks ub ON cr.user_blocks_id = ub.id
    JOIN building_block bb ON bb.id = ub.building_block_id
    WHERE ub.user_id = $1 AND cr.is_approved = false
    ORDER BY cr.id ASC;`
    pool
        .query(queryText, [req.params.id])
        .then((result) => res.send(result.rows))
        .catch((err) => {
            res.sendStatus(500);
            console.log(`IN /coach/critical-experience/${req.params.id}: ${err}`)
        });
});

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
    // First query checks if the user has been assign block
    const queryText1 = `
    SELECT * 
    FROM "user_blocks" 
    WHERE building_block_id = $1 AND "user_id" = $2;`
    // Second query toggles recommended true / false
    const queryText2 = `
    UPDATE "user_blocks" 
    SET is_recommended = $1 
    WHERE building_block_id = $2 AND "user_id" = $3`
    // Third query add user block
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

//grabs all the blocks a specific client's current pyramid
router.get('/client-pyramid/:id', rejectUnauthorized, async (req, res) => {
    const clientId = req.params.id;
    // First query gets ID of pyramid from user
    const queryText1 = `SELECT u.industry_pyramid FROM "user" u WHERE id = $1;`;
    // Second query grabs data for that pyramid
    const queryText2 = `
    SELECT bb.id, bb.name, ipbb.industry_pyramid_id, ub.is_recommended 
    FROM building_block bb
    JOIN industry_pyramid_building_block ipbb ON bb.id = ipbb.building_block_id
    LEFT JOIN "user_blocks" ub 
        ON ub.building_block_id = bb.id
        AND ub.user_id = $1
    WHERE ipbb.industry_pyramid_id = $2
    ORDER BY bb.name ASC;`
    const queryText3 = `
    SELECT bb.id, bb.name, ipbb.industry_pyramid_id, ub.is_recommended 
    FROM building_block bb
    JOIN industry_pyramid_building_block ipbb ON bb.id = ipbb.building_block_id
    LEFT JOIN "user_blocks" ub 
    ON ub.building_block_id = bb.id
    AND ub.user_id = $1
    WHERE ipbb.industry_pyramid_id = $2 OR ipbb.industry_pyramid_id = 1
    ORDER BY bb.name ASC;`;
    const client = await pool.connect();
    try {
        //gets the pyramid_id
        let pyramidId = await client.query(queryText1, [clientId]);
        pyramidId = pyramidId.rows[0].industry_pyramid;
        if (pyramidId === 1) {
            //if the pyramid_id is the generic pyramid then we only need the generic pyramid blocks
            const pyramidData = await client.query(queryText2, [clientId, pyramidId]);
            res.send(pyramidData.rows);
        } else {
            //if the pyramid_id is not from the generic pyramid we nee 
            const allBuildingBlocks = await client.query(queryText3, [clientId, pyramidId]);
            res.send(allBuildingBlocks.rows);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

//deactivates a client
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

//activates a client
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

//updates a critical experience to approved
router.put('/approve-crit-experience/:id', rejectUnauthorized, (req, res) => {
    console.log(req.params);
    const queryText = `UPDATE critical_experience SET is_approved = true WHERE id=$1;`
    pool
        .query(queryText, [req.params.id])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log(`IN /approve-crit-experience/${req.params.id}: ${err}`);
            res.sendStatus(500);
        });
});

// grabs ALL submitted critical experiences based on user id, building block id
router.get('/unapproved_Exp/:id/:bbId', rejectUnauthenticated, (req, res) => {
    const user_id = req.params.id;
    const buildingBlockId = req.params.bbId;
    let queryText = `SELECT cr.id, cr.user_text, cr.user_blocks_id, cr.coach_comments, cr.is_approved, ub.user_id, ub.building_block_id FROM critical_experience cr
    JOIN user_blocks ub on ub.id = cr.user_blocks_id
    WHERE ub.user_id = $1 
    AND ub.building_block_id = $2
    ORDER BY cr.is_approved ASC, cr.id DESC;`
    pool.query(queryText, [user_id, buildingBlockId])
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => {
            console.log('Unable to retrieve critical experiences', error);
        })
});

//allows coaches to add comments
router.put('/add_coach_comments', rejectUnauthorized, (req, res) => {
    const coach_comments = req.body.coach_comments;
    const critical_experience_id = req.body.id;
    console.log(`in add coach comments`);
    let queryText = `
    UPDATE "critical_experience"
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