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
        console.log('tier tier tier tier tier tier tier tier tier tier tier tier tier tier tier tier tier tier ', tier);

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
        console.log('approved approved approved approved approved approved approved approved approved approved approved approved approved approved approved approved approved approved approved ', approved);
        
        console.log('tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] tier[i] ', tier[i]);
        
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

module.exports = router;
