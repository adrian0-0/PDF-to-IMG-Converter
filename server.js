// const app = require ('express')();
import express from "express";
const app = express();
app.get('/', (req, res) => 
    res.send("AHHHaads")
);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`))