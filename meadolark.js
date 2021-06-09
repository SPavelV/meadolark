const express = require("express");
const exphbs = require("express-handlebars");
const handlers = require("./lib/handlers");
const multiparty = require("multiparty");
const cookieParser = require("cookie-parser");
const credentials = require("./credentials");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
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

app.set("view engine", ".hbs");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);
app.get("/about", handlers.about);

// app.use(handlers.notFount);
// app.use(handlers.serverError);

app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);

app.post("/contest/vacation-photo/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});

res.

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express запущен на http://localhost:${port}` +
        "; нажмите Ctrl + C для завершения."
    );
  });
} else {
  module.exports = app;
}
