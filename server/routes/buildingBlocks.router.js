const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


//takes the block id from the path and use it to retrieve the static data for a pyramid block
router.get('/info/:block_id', (req,res) => {
  const queryText = `SELECT building_block.id, building_block."name", building_block.description, ARRAY_AGG(competency."value") FROM building_block
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
  })
});

router.get('/user-data/:block_id/:user_id', (req, res) => {
  let queryText = `SELECT * FROM critical_experience
	WHERE critical_experience.user_id = $1 AND building_block_id = $2;`
  let block_id = req.params.block_id;
  let user_id=req.params.user_id;
  pool.query(queryText, [user_id, block_id])
  .then(result => {
    res.send(result.rows)
  })
  .catch(error => {
    console.log('Unable to retrieve critical experiences', error);
  })
})

module.exports = router;