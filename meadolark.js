const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("Meadowalrk Travel");
});

app.get("/about", (req, res) => {
  res.type("text/plain");
  res.send("O Meadowlark Travel");
});

app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Не найдено");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Ошибка сервера");
});

app.listen(port, () =>
  console.log(
    `Express запущен на http://localhost:${port}; ` +
      `нажмите Ctrl+C для завершения.`
  )
);
