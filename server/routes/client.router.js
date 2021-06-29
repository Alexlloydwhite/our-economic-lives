const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Handles PUT request, this is the end point
// used when a client updates their profile
router.put('/update', rejectUnauthenticated, (req, res) => {
  console.log(req.body, req.user.id);
  const queryText = `
    UPDATE "user" 
    SET 
      first_name=$1, 
      last_name=$2,
      email=$3,
      phone_number=$4,
      city=$5,
      current_profession=$6,
      industry_pyramid=$7
    WHERE id=$8`
  pool
    .query(queryText, [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone_number,
      req.body.city,
      req.body.current_profession,
      req.body.industry_pyramid,
      req.user.id
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.sendStatus(500);
      console.log(`error registering user: ${err}`);
    });
});

// Handles PUT request, this is the end point
// used when a new user logins in for the first time
router.put('/register', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  const queryText = `
    UPDATE "user" 
    SET 
      first_name=$1, 
      last_name=$2,
      phone_number=$3,
      city=$4,
      current_profession=$5,
      industry_pyramid=$6,
      is_registered='true'
    WHERE id=$7`
  let queryText1 = `SELECT building_block.id FROM building_block
    JOIN career_path_building_block ON building_block.id = career_path_building_block.building_block_id
    WHERE career_path_building_block.career_path_id = 1;`
  let queryText2 = `INSERT INTO user_blocks ("user_id", "building_block_id")
    VALUES ($1, $2);`
  try {
    pool
      .query(queryText, [
        req.body.firstName,
        req.body.lastName,
        req.body.phoneNumber,
        req.body.cityOfResidence,
        req.body.currentProfession,
        req.body.industry_pyramid,
        req.user.id
      ])
    let buildingBlockId = await client.query(queryText1);
    for (id of buildingBlockId.rows) {
      await client.query(queryText2, [req.user.id, id.id])
    }
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