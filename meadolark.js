const express = require('express');
const exphbs = require('express-handlebars');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const handlers = require('./lib/handlers');
const multiparty = require('multiparty');
const weatherMiddlware = require('./lib/middleware/weather');
const flashMiddleware = require('./lib/middleware/flash');
const morgan = require('morgan');
const fs = require('fs');
const credentials = require('./credentials');
const cluster = require('cluster');

const app = express();

switch (app.get('env')) {
  case 'development':
    app.use(require('morgan')('dev'));
    break;
  case 'production':
    const stream = fs.createWriteStream(__dirname + '/access.log', {
      flags: 'a',
    });
    app.use(morgan('combined', { stream }));
    break;
}

app.use((req, res, next) => {
  if (cluster.isWorker)
    console.log(`Исполнитель ${cluster.worker.id} получил запрос`);
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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

app.use(cookieParser(credentials.cookieSecret));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
);

app.set('view engine', '.hbs');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(weatherMiddlware);
app.use(flashMiddleware);

app.get('/', handlers.home);
app.get('/about', handlers.about);

// app.use(handlers.notFount);
// app.use(handlers.serverError);

app.get('/newsletter-signup', handlers.newsletterSignup);

app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});

app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  app.status(500).render('500');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express запущен в режиме` +
        `${app.get('env')} на http://localhost:${port}` +
        '; нажмите Ctrl + C для завершения.'
    );
  });
} else {
  module.exports = app;
}
