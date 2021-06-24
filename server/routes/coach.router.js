const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

app.get('/', (req,res) => {
    res.send('yo');
});

module.exports = router;