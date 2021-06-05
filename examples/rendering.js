const express = require("express");
const app = express();

// basic render
app.get("/about", (req, res) => {
  res.render("about");
});

// different response codes
app.get("/error", (req, res) => {
  res.status(500);
  res.render("error");
});
// or
app.get("/error", (req, res) => res.status(500).render("error"));

// view with content
app.get("/greeting", (req, res) => {
  res.render("greeting", {
    message: "Приветствую!",
    style: req.query.style,
    userId: req.cookies.userId,
    username: req.session.username,
  });
});

// view without layout
// у следующего макета нет файла макета, так что
// views/no-layout.handlebars должен включать весь
// необходимый HTML
app.get("/no-layout", (req, res) => {
  res.render("no-layout", { layout: null });
});

// custom layout
// будет использоваться файл макета
// views/layouts/custom.handlebars
app.get("/custom-layout", (req, res) => {
  res.render("custom-layout", { layout: "custom" });
});

// plain text output
app.get("/text", (req, res) => {
  res.type("text/plain");
  res.send("это тест");
});

// error handler
// Это должно находиться ПОСЛЕ всех ваших маршрутов.
// Обратите внимание на то, что, даже если вам
// не нужна функция "next",
// она должна быть включена, чтобы Express
// распознал это как обработчик ошибок.
app.use((err, req, res, next) => {
  console.error("** Ошибка сервера: " + err.message);
  res.status(500).render("08-error", { message: "Не стоило это нажимать!" });
});

// custom 404
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => console.log("Express запущен"));
