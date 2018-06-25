const express = require("express");
const path = require("path");
const cfgData = require("./configLoader");

const _ = {
    serverPort: process.env.PORT || cfgData.serverPort,
    serverFolder: process.env.FOLDER || cfgData.serverFolder,
    htmlFile: "/index.html"
};
_.serverFolder = path.resolve(__dirname + "/" + _.serverFolder);

const app = express();

app.use(express.static(_.serverFolder));
app.get("/download/:articleName", (req, res) => {
    const filePath = path.resolve(_.serverFolder + "/files/" + req.params.articleName);
    res.sendFile(filePath);
});
app.use((req, res) => {
    const filePath = path.resolve(_.serverFolder + _.htmlFile);
    res.sendFile(filePath);
});

app.listen(_.serverPort);

console.log("Server is served on port: " + _.serverPort + " from folder: " + _.serverFolder);

module.exports = app;
