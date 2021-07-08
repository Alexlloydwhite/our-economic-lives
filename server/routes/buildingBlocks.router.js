const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//takes the block id from the path and use it to retrieve the static data for a pyramid block
router.get('/info/:block_id', (req, res) => {
  const queryText = `
  SELECT building_block.id, building_block."name", 
  building_block.description, ARRAY_AGG(competency."value") 
  FROM building_block
	JOIN competency ON building_block.id = competency.building_block_id
	WHERE building_block.id = $1
	GROUP BY building_block.id;`

  let block_id = Number(req.params.block_id);
  pool.query(queryText, [block_id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('Unable to get building block info', error);
    });
});

//retrieves critical experience from a building block based off of the user_block id
router.get('/user-data/:block_id/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM critical_experience
	WHERE critical_experience.user_id = $1 AND building_block_id = $2;`
  let block_id = req.params.block_id;
  let user_id = req.user.id;
  pool.query(queryText, [user_id, block_id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('Unable to retrieve critical experiences', error);
    });
});

//adds a critical experience to the critical experience table
//if the block doesn't exist in the user blocks table it creates it and then adds the critical experience
//if the block exists in the user blocks table it just adds the critical experience
router.post('/add_critical_experience', rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  const client = await pool.connect();
  try {
    let queryText1 = `INSERT INTO critical_experience ("user_text", "user_blocks_id")
    VALUES ($1, $2);`;
    let queryText2 = `SELECT id FROM user_blocks
    WHERE user_id = $1 AND building_block_id = $2;`;
    let queryText3 = `INSERT INTO user_blocks ("user_id", "building_block_id")
    VALUES ($1, $2)
    RETURNING id;`;
    //gets the userBlock id
    let userBlocksId = await client.query(queryText2, [req.body.user_id, req.body.block_id]);
    userBlocksId = userBlocksId.rows;
    console.log(userBlocksId);
    //checks to see if the block exists in the user block table
    if (userBlocksId[0]) {
      //if it does exist add the critical experience using the userBlockId
      await client.query(queryText1, [req.body.user_text, userBlocksId[0].id]);
    } else {
      //if it doesn't exist add the block to the user blocks table
      const newUserBlock = await client.query(queryText3, [req.body.user_id, req.body.block_id]);
      //then add the critical experience
      await client.query(queryText1, [req.body.user_text, newUserBlock.rows[0].id]);
    };
    res.sendStatus(200);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('ERROR POST /api/building-blocks/add_critical_experience', error);
    res.sendStatus(500);
  } finally {
    client.release();
  };
});

router.put('/edit_critical_experience', rejectUnauthenticated, async (req, res) => {
const client = await pool.connect();
console.log('req.body', req.body);
const queryText = `
    UPDATE critical_experience 
    SET user_text=$1 
    WHERE critical_experience.id = $2;`
  try {
    pool
      .query(queryText, [
        req.body.user_text,
        req.body.id
      ])
    client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    client.query('ROLLBACK');
    console.log('Error PUT /api/client/register', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;