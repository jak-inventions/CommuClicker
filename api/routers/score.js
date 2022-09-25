const express = require("express");
const router = express.Router();
const db = require("../database/db");

// PSQL command to get world score

router.get("/", async (req, res) => {
    const { rows: [ first ] } = await db.query("SELECT SUM (score) FROM users");   
    const score = first.sum || 0;
    res.send(`${score}`);
});

router.post("/", async (req, res) => {
    const { rows: [ guest ] } = await db.query("SELECT * FROM users WHERE username=$1", ["guest"]);
    const { rows: [ updatedGuest ] } = await db.query("UPDATE users SET score=$1 WHERE username=$2 RETURNING *", [guest.score + 1, "guest"]);
    res.send(`${updatedGuest.score}`);
});

module.exports = router;