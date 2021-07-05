const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, async (req, res) => {
    const queryText1 = `
        INSERT INTO messages ("id_sender", "text")
        VALUES ($1, $2)
        RETURNING id;`;
    const queryText2 = `
        INSERT INTO users_messages("id_recipient", "id_message")
        VALUES ($1, $2);`;

    const client = await pool.connect();
    try {
        await client.query(queryText1, [req.user.id, req.body.message]);
        res.sendStatus(200);
    } catch (error) {
        console.log(`IN chat post router, ${err}`);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

module.exports = router;