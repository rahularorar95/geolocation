const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(process.env.PORT || 8000, function() {
  console.log(`Server listening on ${app.get('port')}!`);
});

module.exports = app;
