const express = require("express");
const fs = require("fs");
//const fileUpload = require("express-fileupload");

const pdf = require("html-pdf");
const session = require("express-session");

const db = require("../models/db");

const router = express.Router();

//file-upload get
router.get("/note-upload", function (req, res) {
  res.render("note-upload");
});
//file-upload post
// router.post("/note-upload", function (req, res) {
//   var notes = req.body;
//   console.log(notes);
//   res.redirect("note-upload");
// });
// router.post("/note-upload"/*, upload.single("notes"), */function (req, res, next) {
//   // req.file is the `avatar` file
//   var notes = req.file.notes;
//   console.log(notes);
//   res.redirect("note-upload");
// });

//...............................................................................
// '/' (/teacher => "index5")
router.get("/", function (req, res) {
  if (req.session.username != null) {
    res.render("index5" /*, teacherInfo */);
  } else {
    res.redirect("/login");
  }
});
//index5 (/teacher/index5 => "index5")
router.get("/index5", function (req, res) {
  if (req.session.username != null) {
    res.render("index5");
  } else {
    res.redirect("/login");
  }
});

//class routine
router.get("/class-routine", function (req, res) {
  res.render("class-routine");
});
//student-attendence
router.get("/student-attendence", function (req, res) {
  res.render("student-attendence");
});
//exam-grade
router.get("/exam-grade", function (req, res) {
  res.render("exam-grade");
});
//notice-board
router.get("/notice-board", function (req, res) {
  res.render("notice-board");
});
//messaging
router.get("/messaging", function (req, res) {
  res.render("messaging");
});
//map
router.get("/map", function (req, res) {
  res.render("map");
});
//......................................................
// Teacher-profile get req
router.get("/teacher-profile", function (req, res) {
  const sql =
    "SELECT * FROM teacher WHERE teacher_id = " + req.session.username;
  var connection = db.getConnection();
  connection.query(sql, function (error, result) {
    res.render("teacher-profile", result[0]);
  });
  connection.end(function (err) {
    console.log("Connection End...");
  });
});

// Teacher-profile post req
router.post("/teacher-profile", function (req, res) {
  var mysql = require("mysql");

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sms",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  const sql =
    "SELECT * FROM teacher WHERE teacher_id = " + req.session.username;
  connection.query(sql, function (error, result) {
    var html = fs.readFileSync("./views/teacher-profilePDF.ejs", "utf8");
    const options = { format: "A4" };
    res.render("teacher-profilePDF", result[0], function (err, html) {
      pdf
        .create(html, options)
        .toFile("./assets/uploads/profile.pdf", function (err, res) {
          if (err) return console.log(err);
          else {
            console.log(res); // { filename: '/app/businesscard.pdf' }
          }
        });
    });
  });
  //console.log(teacherInfo);
});
router.get("/teacher-profilePDF", function (req, res) {
  //res.render("index5", teacherInfo);
  res.redirect("/teacher-profile");
});
exports.routes = router;
