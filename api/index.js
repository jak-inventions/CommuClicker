const express = require("express");
const scoreRouter = require("./routers/score");
require("dotenv");

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/score", scoreRouter);
app.get("/", (req, res) => {
    res.send("This is the ComClicker API");
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});