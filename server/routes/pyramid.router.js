const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/buildingBlocks/:tier/:pyramid', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT building_block.id, building_block.name FROM building_block
	JOIN industry_pyramid_building_block ON industry_pyramid_building_block.building_block_id = building_block.id
	JOIN industry_pyramid ON industry_pyramid.id = industry_pyramid_building_block.industry_pyramid_id
	WHERE building_block.tier_id = $1 AND industry_pyramid.id = $2
	ORDER BY building_block."name" ASC;`;

  let pyramidId = 0;
  if (req.params.tier < 4) {
    pyramidId = 1;
  } else {
    pyramidId = req.params.pyramid
  };

  pool.query(queryText, [req.params.tier, pyramidId])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('Cannot get building blocks:', error);
    })
});

module.exports = router;