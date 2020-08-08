const express = require("express");
const fs = require("fs");
//const fileUpload = require("express-fileupload");

const pdf = require("html-pdf");

// const db = require("../util/database");

const router = express.Router();

//login get
router.get("/login", function (req, res) {
  res.render("login");
});
//login post
router.post("/login", function (req, res) {
  const userId = req.body.username;
  if (req.body.username == req.body.password) {
    res.redirect("index5");
  } else {
    res.redirect("login");
  }
});
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
//index5
router.get("/index5", function (req, res) {
  res.render("index5" /*, teacherInfo */);
});
//teacher
router.get("/", function (req, res) {
  res.render("index5" /*, teacherInfo */);
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

// Teacher-profile get req
router.get("/teacher-profile", function (req, res) {
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
  const id = 171;
  const sql = "SELECT * FROM teacher WHERE id = " + id;
  connection.query(sql, function (error, result) {
    teacherInfo = {
      id: result[0].id,
      name: result[0].name,
      subject: result[0].subject,
      joining_date: result[0].joining_date,
      gender: result[0].gender,
      email: result[0].email,
      address: result[0].address,
      phone: result[0].phone,
    };
    res.render("teacher-profile", teacherInfo);
    //console.log("this is this is" + req.body.username);
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
  const id = 171;
  const sql = "SELECT * FROM teacher WHERE id = " + id;
  connection.query(sql, function (error, result) {
    teacherInfo = {
      id: result[0].id,
      name: result[0].name,
      subject: result[0].subject,
      joining_date: result[0].joining_date,
      gender: result[0].gender,
      email: result[0].email,
      address: result[0].address,
      phone: result[0].phone,
    };

    var html = fs.readFileSync("./views/teacher-profilePDF.ejs", "utf8");
    const options = { format: "A4" };
    res.render("teacher-profilePDF", teacherInfo, function (err, html) {
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
