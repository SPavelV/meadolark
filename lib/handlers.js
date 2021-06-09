const fortune = require('./fortune.js');

exports.home = (req, res) => res.render('home');

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render('404');

exports.serverError = (err, req, res, next) => res.render('500');

exports.newsletterSignup = (req, res) => {
  res.render('newsletter', { csrf: 'Здесь находится токен CSRF' });
};

exports.newsletterSignupProcess = (req, res) => {
  console.log('Форма (из строки запроса): ' + req.query.form);
  console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf);
  console.log('Имя (из видимого поля формы): ' + req.body.name);
  console.log('E-mail (из видимого поля формы): ' + req.body.email);
  res.redirect(303, '/newsletter-signup/thank-you');
};

exports.newsletterSignupThankYou = (req, res) =>
  res.render('newsletter-signup-thank-you');

exports.newsletter = (req, res) => {
  res.render('newsletter', { csrf: 'Здесь находится токен CSRF' });
};

exports.api = {
  newsletterSignup: (req, res) => {
    console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf);
    console.log('Имя (из видимого поля формы): ' + req.body.name);
    console.log('E-mail (из видимого поля формы): ' + req.body.email);
  },
  vacationPhotoContest: (req, res, fields, files) => {
    console.log('данные поля: ', fields);
    console.log('файлы: ', files);
    res.redirect(303, '/contest/vacation-photo-thank-you');
  },
};

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log('данные поля: ', fields);
  console.log('файлы: ', files);
  res.redirect(303, '/contest/vacation-photo-thank-you');
};
