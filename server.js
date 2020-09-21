const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");

const httpPort = 8081;
const httpsPort = 443;
const key = fs.readFileSync("./certs/localhost.key");
const cert = fs.readFileSync("./certs/localhost.crt");

const app = express();
const server = https.createServer({ key: key, cert: cert }, app);

app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// app.get("/notifications", function (req, res) {
//   const date = new Date();
//   const message = {
//     date: date.toLocaleString(),
//   };

//   res.send(message);
// });

app.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`);
});

server.listen(httpsPort, function () {
  console.log(`Listening on port ${httpsPort}!`);
});
