const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  let queryText = `SELECT is_recommended, building_block.name, building_block.description, building_block.tier_id, competency.name FROM "user_blocks"
  JOIN building_block ON user_blocks.building_block_id = building_block.id
  JOIN competency ON building_block.id = competency.building_block_id                  
  WHERE user_id = $1`
  pool.query(queryText, [Number(req.params.id)])
      .then((result) => {
        
        res.send(result.rows)
      }) .catch ((error) => {
        console.log('Error GET /api/block', error);
        res.sendStatus(500);
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
