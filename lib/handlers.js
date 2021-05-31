const fortune = require("./fortune.js");

exports.home = (req, res) => res.render("home");

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getFortune() });

exports.notFount = (req, res) => res.render("404");

exports.serverError = (err, req, res, next) => res.render("500");
