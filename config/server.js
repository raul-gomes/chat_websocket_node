/* import modules */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
//var expressValidator = require(express_validator);

/* init express object */
var app = express();

/* config views by ejs */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* config middlewares */
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(expressValidator);

/* config consign */

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;