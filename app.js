var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end('Vous êtes à l\'accueil');
});

app.listen(3000,function() {
  console.log('Server running on port 3000');
});
