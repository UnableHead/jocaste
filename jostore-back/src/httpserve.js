const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cfgData = require("./configLoader");
const DataBaseAccess = require("./databaseacess");

const _ = {
  serverPort: process.env.PORT || cfgData.serverPort,
  serverFolder: process.env.FOLDER || cfgData.serverFolder,
  htmlFile: "/index.html"
};
_.serverFolder = path.resolve(__dirname + "/" + _.serverFolder);

const app = express();
const dataBaseAccess = new DataBaseAccess();


// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set route path
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.get("/download/*", (req, res) => {
  const filePath = path.resolve(_.serverFolder + "/files/" + req.params[0]);
  res.sendFile(filePath);
});
app.post("/query/:queryKeyword", (req, res) => {
  console.log("Matthias", req.body);
  dataBaseAccess.dbRequest({keyword: req.params.queryKeyword}, (a) => {
    res.send(a);
  });
});
app.use(express.static(_.serverFolder));
app.use((req, res) => {
  console.log("Matthias", req.url);
  const filePath = path.resolve(_.serverFolder + _.htmlFile);
  res.sendFile(filePath);
});

// launch server
app.listen(_.serverPort);

console.log("Server is served on port: " + _.serverPort + " from folder: " + _.serverFolder);

module.exports = app;
