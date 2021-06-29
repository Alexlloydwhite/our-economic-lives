csvtojson = require("csvtojson");
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/:id', async (req, res) => {
    console.log('in upload POST');
    const client = await pool.connect();
    try {
        client.query('BEGIN')
        //Takes file from req and turns it into a string
        csvData = req.files.file.data.toString('utf8');
        //Takes the string and turns it into an array of json objects
        csvtojson().fromString(csvData).then(async (jsonObj) => {
            //sorts the array of json objects alphabetically
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
            let queryText1 = `INSERT INTO "building_block" ("name", "description", "tier_id")
                VALUES ($1, $2, $3)
                RETURNING id;`
            let queryText2 = `INSERT INTO "competency" ("value", "building_block_id")
                VALUES ($1, $2)`
            let queryText3 = `INSERT INTO "industry_pyramid_building_block" ("building_block_id", "industry_pyramid_id")
                VALUES ($1, $2)`
            let previousBlockName = 'test';
            let buildingBlockId = 0;
            //loops through the array of json object
            for (const block of jsonObj ) {
                console.log('Beginning', buildingBlockId);
                //switch statement to check if the previous block name is the same so it only creates the competency if it is.
                switch (block.Name) {
                    case previousBlockName:
                        console.log(block.Name, 'in case', previousBlockName, buildingBlockId);
                        await client.query(queryText2, [block.value, buildingBlockId]);
                        console.log('after case competency', buildingBlockId);
                        break;
                    default:
                        console.log(previousBlockName, 'in default', block.Name, buildingBlockId);
                        previousBlockName = block.Name;
                        //Creates a new Building Block
                        const buildingBlockResults = await client.query(queryText1, [block.Name, block.Description, block.tier_id]);
                        console.log('before set', buildingBlockId);
                        buildingBlockId = buildingBlockResults.rows[0].id;
                        console.log('after set', buildingBlockId);
                        //Creates a competency
                        await client.query(queryText2, [block.value, buildingBlockId]);
                        console.log('after default competency', buildingBlockId);
                        //Inserts into the join table
                        await client.query(queryText3, [buildingBlockId, req.params.id]);
                        console.log('after default join', buildingBlockId);
                }// end switch statement
            }; //end forEach loop
        }); //end csvtojson .then
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