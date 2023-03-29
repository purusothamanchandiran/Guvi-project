const express = require("express");
const mysql = require("mysql");
const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const app = express();

doenv.config({
  path: "./.env",
});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connection Success");
  }
});

const location  = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);


app.get("/",(req,res)=>{
  res.render("index");
});

app.get("/register",(req,res)=>{
  res.render("register");
});

app.get("/profile",(req,res)=>{
  res.render("profile");
});

app.get("/home",(req,res)=>{
  res.render("home");
});

app.listen(5000,() => {
  console.log("Server started @ port 5000")
});