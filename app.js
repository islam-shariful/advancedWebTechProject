const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const teacher = require("./controller/teacher");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//to compile dynamic templates with the ejs engine
app.set("view engine", "ejs");
// //where to find these templates
// app.set("views", "views");

//app.use(express.static(path.join(__dirname, "assets")));
app.use("/assets", express.static("assets"));

app.use("/teacher", teacher.routes);

app.listen(3000);
