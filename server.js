const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

//middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + " : " + req.method + " : " + req.url;

  console.log(now);
  console.log(req.method);
  console.log(req.url);
  fs.appendFile('server.log', log + ' \n', (err) => {

  });
  next();
});

//middleware
app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

//middleware to provide static folder to app
app.use(express.static(__dirname + '/public'));

//set up handle bar partial for footer and header
hbs.registerPartials(__dirname + '/views/partials')

//set up handle bar
app.set('view engine', 'hbs');

//for get Current year value in html template
hbs.registerHelper('getCurrentYear', ()=>{
  new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});


app.get('/', function(req, res){
  //res.send('<h1>Hello Express!<h1>');

  // res.send({
  //   name: 'Nyi',
  //   likes: [
  //     'Biking',
  //     'Reading'
  //   ]
  // });

  res.render('home.hbs', {
    name: 'Nyi',
    pageTitle: 'Home',
    currentTime: new Date().getFullYear()
  });
});

// app.get('/help', (req, res){
//   res.send('About page');
// });

app.get('/about', function(req, res){
  res.render('about.hbs', {
    pageTitle: 'About',
    currentTime: new Date().getFullYear()
  });
});

app.listen(port, ()=>{
  console.log('Server is running on port ' + port);
});
