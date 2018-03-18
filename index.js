const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use('/static', express.static(__dirname + '/assets', {
  setHeaders: function(res, path) {
    res.set("Content-Encoding", "");
  }
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/video', function (req, res) {
  var filePath = "assets/sample-2.mp4";

  fs.stat(filePath, (err, stats) => {
    var fileSize = stats.size;
    var chunkSize = 0;
    var options = {
      startSize: startSize = 0,
      endSize: endSize = stats.size
    }

    var header = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Accept-Ranges": "bytes",
      "Content-Range": "bytes " +
        startSize + "-" + endSize + "/" + fileSize,
      "Content-Encoding": "",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    }

    res.writeHead(200, header)

    var stream = fs.createReadStream(
      filePath,
      options
    ).on("readable", () => {
      while (chunkSize = stream.read(1024)) {
        res.write(chunkSize);
      }
    }).on("close", () => {
      res.end();
    });
  });
});

module.exports.handler = serverless(app);