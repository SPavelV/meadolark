module.exports = (req, res, next) => {
  req.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
};
