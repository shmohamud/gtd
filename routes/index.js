let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("Root");
});

router.get("/projects", (req, res) => {
  res.send("Projects");
});

router.get("/actions", (req, res) => {
  res.send("Actions");
});

module.exports = router;
