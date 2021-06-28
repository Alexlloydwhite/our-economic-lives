const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles PUT request, this is the end point
// used when a client updates their profile
router.put('/update', (req, res) => {
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
      desired_career=$7
    WHERE id=$8`
    pool
      .query(queryText, [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.phone_number,
        req.body.city,
        req.body.current_profession,
        req.body.desired_career,
        req.user.id
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        res.sendStatus(500);
        console.log(`error registering user: ${err}`);
      });
  });

  module.exports = router;