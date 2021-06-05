const express = require("express");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// basic form processing
app.post("/process-contact", (req, res) => {
  console.log(`Получен контакт от ${req.body.name} <${req.body.email}`);
  res.redirect(303, "10-thank-you");
});

// more robust form processing
app.post("/process-contact", (req, res) => {
  try {
    // Здесь мы попытаемся сохранить контакт в базе данных
    // или воспользуемся другим способом хранения...
    // На данный момент мы просто сымитируем ошибку.
    if (req.body.simulateError)
      throw new Error("ошибка при сохранении контакта");
    console.log(`Получен контакт от ${req.body.name} <${req.body.email}`);
    res.format({
      "text/html": () => res.redirect(303, "10-thank-you"),
      "application/json": () => res.json({ success: true }),
    });
  } catch (err) {
    // Здесь мы будем обрабатывать все ошибки при сохранении
    console.error(
      `Ошибка при обработке контакта от ${req.body.name} ` +
        `<${req.body.email}>`
    );

    res.format({
      "text/html": () => res.redirect(303, "/contact-error"),
      "application/json": () =>
        res.status(500).json({
          error: "ошибка при сохранении информации о контакте",
        }),
    });
  }
});

app.listen(3000, () => console.log("Express запущен"));
