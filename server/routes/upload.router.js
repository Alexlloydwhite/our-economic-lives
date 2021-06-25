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
            let queryText3 = `INSERT INTO "career_path_building_block" ("building_block_id", "career_path_id")
                VALUES ($1, $2)`
            let previousBlockName = 'test';
            let buildingBlockId = 0;
            //loops through the array of json object
            jsonObj.forEach(async (block) => {
                    //broken if else statement
                    // if (block.Name === previousBlockName) {
                    //     console.log('in If', block.Name, previousBlockName);
                    //     client.query(queryText2, [block.value, buildingBlockId]);
                    // } else {
                    //     console.log(previousBlockName, 'in else', block.Name);
                    //     previousBlockName = block.Name;
                    //     //Creates a new Building Block
                    //     const buildingBlockResults = await client.query(queryText1, [block.Name, block.Description, block.tier_id]);
                    //     buildingBlockId = buildingBlockResults.rows[0].id;
                    //     //Creates
                    //     client.query(queryText2, [block.value, buildingBlockId]);
                    //     //
                    //     client.query(queryText3, [buildingBlockId, req.params.id]);
                    // } // end if else
                //switch statement to check if the previous block name is the same so it only creates the competency if it is.
                switch (block.Name) {
                    case previousBlockName:
                        // Creates the competency
                        client.query(queryText2, [block.value, buildingBlockId]);
                        break;
                    default:
                        previousBlockName = block.Name;
                        //Creates a new Building Block
                        const buildingBlockResults = await client.query(queryText1, [block.Name, block.Description, block.tier_id]);
                        buildingBlockId = buildingBlockResults.rows[0].id;
                        //Creates the competency
                        client.query(queryText2, [block.value, buildingBlockId]);
                        //Creates the insert into the join table between the career path and builing block
                        client.query(queryText3, [buildingBlockId, req.params.id]);
                }
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