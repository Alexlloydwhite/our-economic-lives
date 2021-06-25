const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

// Handles PUT request, this is the end point
// used when a new user logins in for the first time
router.put('/register', (req, res) => {
    console.log(req.body, req.user.id);
    const queryText = `
    UPDATE "user" 
    SET 
      first_name=$1, 
      last_name=$2,
      phone_number=$3,
      city=$4,
      current_profession=$5,
      desired_career=$6,
      is_registered='true'
    WHERE id=$7`
    pool
        .query(queryText, [
            req.body.firstName,
            req.body.lastName,
            req.body.phoneNumber,
            req.body.cityOfResidence,
            req.body.currentProfession,
            req.body.careerPyramid,
            req.user.id
        ])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            res.sendStatus(500);
            console.log(`error registering user: ${err}`);
        });
});

module.exports = router;