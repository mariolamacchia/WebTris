var resolve = require('path').resolve;
var express = require('express');
var app = express();

app.get('/scripts/TicTacToe.js', function(req, res) {
    res.sendFile(resolve(__dirname + '/../../TicTacToe.js'));
});
app.use(express.static(__dirname));
app.listen(8080);
