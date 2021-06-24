csvtojson = require("csvtojson");
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        client.query('BEGIN')
        csvData = req.files.file.data.toString('utf8');
        csvtojson().fromString(csvData).then(async (jsonObj) => {
            await jsonObj.sort((a, b) => {
                let fa = a.Name.toLowerCase(),
                    fb = b.Name.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0
            });
            let previousBlockName = 'test';
            let buildingBlockId = 0;
            jsonObj.forEach(async (block) => {
                let queryText1 = `INSERT INTO "building_block" ("name", "description", "tier_id")
                VALUES ($1, $2, $3)
                RETURNING id;`
                let queryText2 = `INSERT INTO "competency" ("value", "building_block_id")
                VALUES ($1, $2)`
                let queryText3 = `INSERT INTO "career_path_building_block" ("building_block_id", "career_path_id")
                VALUES ($1, $2)`
                if (block.Name === previousBlockName) {
                    previousBlockName = block.Name;
                    await client.query(queryText2, [block.value, buildingBlockId])
                } else {
                    previousBlockName = block.Name;
                    const buildingBlockResults = await client.query(queryText1, [block.Name, block.Description, block.tier_id]);
                    buildingBlockId = buildingBlockResults.rows[0].id;
                    await client.query(queryText2, [block.value, buildingBlockId]);
                    await client.query(queryText3, [buildingBlockId, req.params.id]);
                } // end if else
            }) //end forEach loop
        }) //end csvtojson .then
        client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error in POST /api/upload', error);
    } finally {
        client.release();
    }

})



module.exports = router;