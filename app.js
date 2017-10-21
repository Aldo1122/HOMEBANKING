
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config');
// route interna
var users = require('./routes/users');

// connect to mongodb

  connect_db(config.database);


// function that determines if we going prod or dev
function connect_db(database) {
    mongoose.connect(database);

    mongoose.connection.on("connected", function() {
        console.log("connected to the database" + database);
    });
}

//on error connection
mongoose.connection.on("error", function(err) {
  console.log("there has been an error" + err);
});

// initialize our app variable with express
const app = express();
// keep this one for heroku
const port = process.env.PORT || 3000;


//cors middleware
app.use(express.static(path.join(__dirname, "public")));

//router
//body parser middleware
app.use(bodyParser.json());

// index route

// enable ssl redirect


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
 });
 

 // un altra route
 app.get('/homepage', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/homepage.html'));  
});

app.get('/myaccount', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/myaccount.html'));  
});

app.get('/logo', function(req, res){
  //richiesta non ci facciamo niente
  res.sendFile(path.join(__dirname, 'public/logo.jpg'));  
});

 // un altra route
 // json response
 app.get('/json', function(req, res){
  //richiesta non ci facciamo niente
	return res.json({ contenitore: { contenuto1: "contenuto del contenuto" } });
});

app.get('/bonifico bancario', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/bonifico bancario.html'));  
});

//non funziona
app.get('/bonifico effettuato', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/bonifico effettuato.html'));  
});

app.get('/homepage', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'myaccount.html'));  
});

app.get('/finanziamenti', function(req, res){
  //richiesta non ci facciamo niente
  res.sendFile(path.join(__dirname, 'public/finanziamenti.html'));  
});

app.get('/investimenti', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/investimenti.html'));  
});

app.get('/listamovimenti', function(req, res){
  //richiesta non ci facciamo niente
  res.sendFile(path.join(__dirname, 'public/lista movimenti.html'));  
});

app.get('/problemi', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/problemi.html'));  
});

app.get('/situazione attuale', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/situazione attuale.html'));  
});


app.get('/homepage', function(req, res){
  //richiesta non ci facciamo niente
	res.sendFile(path.join(__dirname, 'public/homepage.html'));  
});
app.use("/users", users); // route handle for the users


//start server
var server = app.listen(port, function() {
  console.log("server started on port : " + port);
});
