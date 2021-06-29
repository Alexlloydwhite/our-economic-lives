const { ViewModuleSharp } = require('@material-ui/icons');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/buildingBlocks/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM building_block 
    WHERE tier_id = $1
    ORDER BY tier_id ASC, id ASC;`;

  pool.query(queryText, [req.params.id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('Cannot get building blocks:', error);
    })
});

module.exports = router;