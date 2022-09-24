const express = require("express");
const router = express.Router();

// PSQL command to get world score
// SELECT SUM (score) FROM users WHERE true;

router.get("/", (req, res) => {
    res.send(`${0}`);
});

module.exports = router;