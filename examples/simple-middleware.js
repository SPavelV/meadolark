app.use((rew, res, next) => {
  console.log(`обработка запроса для ${req.url}....`);
});

app.use((req, res, next) => {
  console.log('завершаем запрос');
  res.send('Спасибо за игру!');
});

app.use((req, res, next) => {
  console.log('Упс, меня никогда не вызовут');
});
