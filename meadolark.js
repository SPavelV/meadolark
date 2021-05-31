const express = require("express");
const expressHandlebars = require("express-handlebars");
const handlers = require("./lib/handlers");

const app = express();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(handlers.notFount);

app.use(handlers.serverError);

app.listen(port, () =>
  console.log(
    `Express запущен на http://localhost:${port}; ` +
      `нажмите Ctrl+C для завершения.`
  )
);
