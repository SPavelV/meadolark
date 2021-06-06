const express = require('express');
const exphbs = require('express-handlebars');
const handlers = require('./lib/handlers');

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

app.set('view engine', '.hbs');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', handlers.home);

app.get('/about', handlers.about);

// app.use(handlers.notFount);

// app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express запущен на http://localhost:${port}` +
        '; нажмите Ctrl + C для завершения.'
    );
  });
} else {
  module.exports = app;
}
