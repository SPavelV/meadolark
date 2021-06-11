const { credentials } = require('../config');

const emailService = require('../lib/email')(credentials);

emailService.send(
  'joecustomer@gmail.com',
  'Сегодня распродажа туров Худ-Ривер!',
  'Налетайте на них, пока не остыли!'
);
