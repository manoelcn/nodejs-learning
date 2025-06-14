import express from "express";

const app = express();
const port = 8082;

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
});