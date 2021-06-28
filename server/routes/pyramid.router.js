const { ViewModuleSharp } = require('@material-ui/icons');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/buildingBlocks', (req, res) => {
  const queryText = `SELECT * FROM building_block 
    ORDER BY tier_id ASC, id ASC;`;
  pool.query(queryText)
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('Cannot get building blocks:', error);
    })
});

module.exports = router;