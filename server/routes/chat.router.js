const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

router.post('/:id', rejectUnauthenticated, (req,res) => {

});

module.exports = router;