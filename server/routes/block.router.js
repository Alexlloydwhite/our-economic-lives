const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', async (req, res) => {
  const client = await pool.connect()
  try {
    let queryText = `SELECT is_recommended, building_block.name, building_block.description, building_block.tier_id, building_block.id FROM "user_blocks"
    JOIN building_block ON user_blocks.building_block_id = building_block.id               
    WHERE user_id = $1;`
    await client.query('BEGIN');
    //gets a users building blocks from the database
    let buildingBlocks = await client.query(queryText, [Number(req.params.id)])
    buildingBlocks = buildingBlocks.rows;
    //loops through those building blocks             
    for (let i = 0; i < buildingBlocks.length; i++) {
      queryText = `SELECT value FROM competency
      WHERE building_block_id = $1`
      //gets competency values for each building block from the database
      let result = await client.query(queryText, [Number(buildingBlocks[i].id)])  
      result = result.rows; 
      console.log(result);  
      let valueArray = []
      //loops through the values and put them into a temporary array
      for (let i = 0; i < result.length; i++) {
        valueArray.push(result[i].value)
      }
      //creates a new attribute in the building block object and assigns the value array to it
      buildingBlocks[i].value = valueArray; 
    }    
    console.log(buildingBlocks);
    await client.query('COMMIT')
    //sends the array of building blocks back to the client side code
    res.send(buildingBlocks)
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('ERROR GET /api/block', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
