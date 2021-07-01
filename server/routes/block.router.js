const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, async (req, res) => {
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

router.post('/block_detail', async (req, res) => {
  console.log('req.body', req.body);

  const client = await pool.connect()
  try {
    let queryText1 = `SELECT critical_experience.user_text, user_blocks.id, critical_experience.coach_comments, critical_experience.is_completed,  building_block.name, building_block.description  FROM "user_blocks"
    JOIN building_block ON user_blocks.building_block_id = building_block.id 
    JOIN critical_experience ON user_blocks.id = critical_experience.user_blocks_id              
    WHERE user_blocks.user_id = $1
    AND user_blocks.building_block_id = $2`
    let queryText2 = `SELECT value FROM competency
    WHERE building_block_id = $1`
    await client.query('BEGIN');
    //gets a users critical experiences from the database
    let criticalExperience = await client.query(queryText1, [req.body.userId, req.body.buildingBlockId])
    criticalExperience = criticalExperience.rows
    //gets competency values for the building block from the database
    let result = await client.query(queryText2, [req.body.buildingBlockId])
    result = result.rows;
    await client.query('COMMIT')
    //sends the array of building blocks back to the client side code
    res.send({ criticalExperience: criticalExperience, competencies: result })
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('ERROR GET /api/block/block_detail', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
})

router.post('/', rejectUnauthenticated, async (req, res) => {
  let user_id = req.body.id;
  const client = await pool.connect();
  try {
    let queryText1 = `SELECT building_block.id FROM building_block
    JOIN industry_pyramid_building_block ON building_block.id = industry_pyramid_building_block.building_block_id
    WHERE industry_pyramid_building_block.industry_pyramid_id = 1;`
    let queryText2 = `INSERT INTO user_blocks ("user_id", "building_block_id")
    VALUES ($1, $2);`
    let buildingBlockId = await client.query(queryText1);
    for (id of buildingBlockId.rows) {
      await client.query(queryText2, [user_id, id.id])
    }
    client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error POST /api/block', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;
