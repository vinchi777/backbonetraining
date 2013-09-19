
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/test')
var app = express();

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file){
	require(models_path + '/' + file)
})

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});

// all environments
app.set('port', process.env.PORT || 9090);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



var person = require('./routes/person');
app.get('/', routes.index);
app.get('/persons', person.list);
app.post('/persons', person.create);
app.put('/persons/:id', person.update);
app.delete('/persons/:id', person.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
