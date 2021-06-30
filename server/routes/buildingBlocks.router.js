const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/info/:block_id', (req,res) => {
  const queryText = `SELECT building_block.id, building_block."name", building_block.description, ARRAY_AGG(competency."value") FROM building_block
	JOIN competency ON building_block.id = competency.building_block_id
	WHERE building_block.id = $1
	GROUP BY building_block.id;`
  
  let block_id = Number(req.params.block_id);
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', block_id);
  pool.query(queryText, [block_id])
  .then(result => {
    res.send(result.rows)
  })
  .catch(error => {
    console.log('Unable to get building block info', error);
  })
});

module.exports = router;