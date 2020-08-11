const express = require("express");

const router = express();

router.get("/", (req, res) => {
  req.session.username = null;
  res.redirect("/login");
});

module.exports.routes = router;
