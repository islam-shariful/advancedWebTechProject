const express = require("express");

const router = express.Router();

//login get
router.get("/", function (req, res) {
  res.render("login");
});
//login post
router.post("/", function (req, res) {
  if (req.body.username == req.body.password) {
    req.session.username = req.body.username;
    res.redirect("/teacher/index5");
  } else {
    res.redirect("login");
  }
});

exports.routes = router;
