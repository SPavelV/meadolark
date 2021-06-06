const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
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

// template sections
app.get('/section-test', (req, res) => {
  res.render('section-test', { layout: 'section' });
});

app.listen(3000, () => console.log('Express запущен'));
