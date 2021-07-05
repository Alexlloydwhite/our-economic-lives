const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get(
  "/buildingBlocks/:tier/:pyramid",
  rejectUnauthenticated,
  async (req, res) => {
    const client = await pool.connect();
    try {
      client.query("BEGIN");
      const queryText = `SELECT building_block.id, building_block.name FROM building_block
        JOIN industry_pyramid_building_block ON industry_pyramid_building_block.building_block_id = building_block.id
        JOIN industry_pyramid ON industry_pyramid.id = industry_pyramid_building_block.industry_pyramid_id
        WHERE building_block.tier_id = $1 AND industry_pyramid.id = $2
        ORDER BY building_block."name" ASC;`;

      let user = req.user.id;
      let pyramidId = 0;
      if (req.params.tier < 4) {
        pyramidId = 1;
      } else {
        pyramidId = req.params.pyramid;
      }

      const result1 = await client.query(queryText, [
        req.params.tier,
        pyramidId,
      ]);
      let tier = result1.rows;
      
      
      for (let i = 0; i < tier.length; i++) {
        let approved = 0;
        let block_id = tier[i].id;
        const queryTextLoop = `SELECT user_blocks.user_id, user_blocks.building_block_id, COUNT(critical_experience.is_approved = 'true') AS approved FROM user_blocks
        JOIN critical_experience ON user_blocks.id = critical_experience.user_blocks_id
        WHERE user_blocks.user_id = $1 AND user_blocks.building_block_id = $2
        GROUP BY user_blocks.user_id, user_blocks.building_block_id;`;
        let result2 = await client.query(queryTextLoop, [user, block_id])
        if (result2.rows[0] === undefined) {
          approved = 0;
        } else {
          approved = Number(result2.rows[0].approved);
        }
        (tier[i]).approved = approved;
      } // end for loop
      client.query("COMMIT");
      res.send(tier);
    } catch (error) {
      await client.query("ROLLBACK");
      console.log("Cannot get building blocks:", error);
    } finally {
      client.release();
    }
  }
);

router.get('/progress/:pyramid', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  const pyramidId = req.params.pyramid;
  try{
    client.query('BEGIN');
    const queryTierTotal = `SELECT COUNT(*) FROM industry_pyramid ip
      JOIN industry_pyramid_building_block ipbb ON ipbb.industry_pyramid_id = ip.id
      JOIN building_block bb ON bb.id = ipbb.building_block_id
      WHERE ip.id = $1 AND bb.tier_id = $2
      GROUP BY ip.id, bb.tier_id 
      ORDER BY bb.tier_id ASC;`;
    const tierTotal = []
    for (let i = 1; i < 8; i++) {
      let tierPyramid;
      if (i < 4) {
        tierPyramid = 1;
      } else {
        tierPyramid = pyramidId;
      }
      let response = await client.query(queryTierTotal, [tierPyramid, i])

      if (response.rows[0] !== undefined) {
        tierTotal.push(Number(response.rows[0].count));
      } else {
        tierTotal.push(0);
      }
    }

    const queryApprovedText = `SELECT bb.tier_id AS tier, COUNT(*) FROM user_blocks AS ub
      JOIN critical_experience AS ce ON ce.user_blocks_id = ub.id
      JOIN building_block AS bb ON ub.building_block_id = bb.id
      JOIN industry_pyramid_building_block AS ipbb ON bb.id = ipbb.building_block_id
      JOIN industry_pyramid AS ip ON ip.id = ipbb.industry_pyramid_id
      WHERE ub.user_id = $1 AND ce.is_approved = 'true' AND ip.id = $2
      GROUP BY bb.tier_id;`;

      const userId = req.user.id;
      const generalApprovedResponse = await client.query(queryApprovedText, [userId, 1]);
      const generalApproved = generalApprovedResponse.rows;

      const specificApprovedResponse = await client.query(queryApprovedText, [userId, pyramidId]);
      const specificApproved = specificApprovedResponse.rows;

      const approved = generalApproved.concat(specificApproved);

      let progress = [];

      for (let i = 0; i < tierTotal.length; i++) {
        let tierApproved = 0;
        for (let j = 0; j < approved.length; j++) {
          if (approved[j].tier === i + 1) {
            tierApproved = approved[j].count;
          }
        }
        let tierProgress = tierApproved / (tierTotal[i] * 5);
        
        if (!tierProgress) {
          tierProgress = 0;
        }
        progress.push(tierProgress);

      }
      const selectedPyramid = await client.query(`SELECT name FROM industry_pyramid
        WHERE id=$1`, [pyramidId]);
      progress = { progress: progress, pyramid: selectedPyramid.rows[0].name }
      client.query('COMMIT');
    res.send(progress);
  } catch (error) {
    console.log('Cannot get pyramid progress', error);
  } finally {
    client.release();
  }
});

module.exports = router;
