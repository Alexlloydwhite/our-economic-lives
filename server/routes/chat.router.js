const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// This end point is used to get a list of all messages between a coach and a client.
// It takes an optional params ID used by the coach to grab messages for their specific client.
// Clients get coach id from req.user.coach_id
router.get('/:id?', rejectUnauthenticated, (req, res) => {
    let recipientId;
    // If user is a client, get coach ID from req.user
    // If user is a coach, get client id from params
    if (req.user.authorization === 3) {
        recipientId = req.user.coach_id; 
    } else {
        recipientId = req.params.id;
    }
    // Query to grab messages, note that it limits to 100
    const queryText = `
        SELECT * FROM messages m
        JOIN users_messages um ON um.id_message = m.id
        WHERE (m.id_sender = $1 AND um.id_recipient = $2)
        OR (m.id_sender = $2 AND um.id_recipient = $1)
        ORDER BY m.send_date ASC
        LIMIT 100;
    `;
    pool
        .query(queryText, [req.user.id, recipientId])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(`IN GET chat router: ${err}`);
        });
});

// This end point is used to post a new message.
router.post('/', rejectUnauthenticated, async (req, res) => {
    let recipientId;
    // If user is a client, get coach ID from req.user
    // If user is a coach, get client id from req.body
    if (req.user.authorization === 3) {
        recipientId = req.user.coach_id; 
    } else {
        recipientId = req.body.clientId;
    }
    // First query adds the message to generic messages table. 
    // This captures the sender id, message text, and timestamps the message.
    // The ID is returned and used in the second query.
    const queryText1 = `
        INSERT INTO messages ("id_sender", "text") VALUES ($1, $2) RETURNING id;
    `;
    // Second query adds the message to the user messages table.
    // This adds a recipient to the message and tracks wether it has been read.
    const queryText2 = `
        INSERT INTO users_messages("id_recipient", "id_message") VALUES ($1, $2);
    `;
    const client = await pool.connect();
    try {
        // Post new message to messages table
        const newMessage = await client.query(queryText1, [req.user.id, req.body.message]);
        // Grab id of new message
        const newMessageId = newMessage.rows[0].id;
        // Post new message to users_messages table
        await client.query(queryText2, [recipientId, newMessageId]);
        res.sendStatus(200);
    } catch (err) {
        console.log(`IN chat post router, ${err}`);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

module.exports = router;