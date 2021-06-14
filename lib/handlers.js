const fortune = require('./fortune.js');
const pathUtils = require('path');
const fs = reqruire('fs');

exports.home = (req, res) => {
  res.cookie('monster', 'ням-ням');
  res.cookie('signed_monster', 'ням-ням', { signed: true });
  res.render('home');
};

exports.about = (req, res) => {
  const monster = req.cookies.monster;
  const signed_monster = req.signedCookies.signed_monster;
  req.session.userName = 'Anonymous';
  const colorScheme = req.session.colorScheme || 'dark';
  console.log(monster);
  console.log(signed_monster);
  res.render('about', { fortune: fortune.getFortune() });
};

exports.notFound = (req, res) => {
  res.clearCookie('monster');
  req.session.userName = null;
  delete req.session.colorScheme;
  res.render('404');
};

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

const dataDir = pathUtils.resolve(__dirname, '..', 'data');
const vacationPhotosDir = pathUtils.join(dataDir, 'vacation-photos');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(vacationPhotosDir)) fs.mkdirSync(vacationPhotosDir);

function saveContestEntry(contestName, email, year, month, photoPath) {
  // TODO
}

const { promisify } = require('util');
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);

exports.api.vacationPhotoContest = async (req, res, fields, files) => {
  const photo = files.photo[0];
  const dir = vacationPhotosDir + '/' + Date.now();
  const path = dir + '/' + photo.originalFilename;
  await mkdir(dir);
  await rename(photo.path, path);
  saveContestEntry(
    'vacation-photo',
    fields.email,
    req.params.year,
    req.params.month,
    path
  );
  res.send({ result: 'success' });
};
