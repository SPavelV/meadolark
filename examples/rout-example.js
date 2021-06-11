const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('\n\nВСЕГДА');
  next();
});

app.get('/a', (req, res) => {
  console.log('/a: маршрут завершен');
  res.send('a');
});

app.get('/a', (req, res) => {
  console.log('a/: никогда не вызывается');
});

app.get('/b', (req, res, next) => {
  console.log('/b: маршрут не завершен');
  next();
});

app.use((req, res, next) => {
  console.log('ИНОГДА');
  next();
});

app.get('/b', (req, res, next) => {
  console.log('/b (часть 2): сгененрированная ошибка');
  throw new Error('b не выполнено');
});

app.use('/b', (err, req, res, next) => {
  console.log('/b ошибка обнаружена и передана далее');
  next(err);
});

app.get('/c', (err, req) => {
  console.log('/c: сгененрированна ошибка');
  throw new Error('не выполнено');
});

app.use('/c', (err, req, res, next) => {
  console.log('/c: ошибка обнаружена, но не передана далее');
  next();
});

app.use((err, req, res, next) => {
  console.log('обнаружена неорбработанная ошибка: ' + err.message);
  res.send('500 - ошибка сервера');
});

app.use((req, res) => {
  console.log('маршрут не обработан');
  res.send('404 - не найдено');
});

const port = process.env.port || 3000;
app.listen(port, () =>
  console.log(
    `Express запущен на http://localhost: ${port}; для завершения нажмите Ctrl + C.`
  )
);
