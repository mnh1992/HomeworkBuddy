/**
 * Created by Maheshi.Hemachandra on 9/25/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sentiment = require('sentiment');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
var port = process.env.port || 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Example app listening on port' + port);
});

