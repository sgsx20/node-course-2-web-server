const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// App.use is called based on the order it is placed in.
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}; ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    err && console.log('Unable to append to server.log');
  })
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'))

// name of the function and what the function returns
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Bad page'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
