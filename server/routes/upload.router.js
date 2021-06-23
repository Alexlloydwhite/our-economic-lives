const { ViewModuleSharp } = require('@material-ui/icons');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        csvData = req.files.file.data.toString('utf8');
        const jsonObj = csvtojson().fromString(csvData)
        client.query('BEGIN')
        jsonObj.forEach(block => {
            let queryText = `INSERT INTO 
            RETURNING id`
            return client.query(queryText, [block.name, block.tier_id, block.etc])
        })
        
        
        
        client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error in POST /api/upload', error);
    } finally {
        client.release();
    }

})



module.exports = router;