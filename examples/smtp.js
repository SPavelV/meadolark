const nodeMailer = require('nodemailer');
const credentials = require('./credentials');

const mailTransport = nodeMailer.createTransport({
  auth: {
    user: credentials.sendgrid,
    pass: credentials.sendgrid.password,
  },
});

try {
  const result = await mailTransport.sendMail({
    from: '"Meadowlark Travel"<info@meadolark.com>',
    to: 'joecustomer@gmail.com',
    subject: 'Ваш тур Meadolark Travel',
    text: 'Спасибо за заказ поездки в Meadolark Travel. Мы ждем вас с нетерпением!',
  });
  console.log('письмо успешно отправлено', result);
} catch (err) {
  console.log('невозможно отправить письмо: ', err.message);
}
