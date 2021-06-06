const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.use(express.static(__dirname + '/public'));

app.set('view engine', '.hbs');

app.get('/foo', (req, res) => res.render('foo'));

// rendering view without layout
app.get('/bar', (req, res) => res.render('bar', { layout: null }));

// custom layout
app.get('/custom-layout', (req, res) =>
  res.render('custom', { layout: 'custom-layout' })
);

app.listen(3000, () => console.log('Express запущен'));
