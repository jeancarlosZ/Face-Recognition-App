const express = require("express");
const cors = require("cors");

const image = require("./controllers/image.cjs");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });

app.listen(3000, () => {
  console.log("app is running on port 3000");
});