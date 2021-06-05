const express = require("express");
const app = express();

var tours = [
  { id: 0, name: "Худ-Ривер", price: 99.99 },
  { id: 1, name: "Орегон Коуст", price: 149.95 },
];

// api get
app.get("/api/tours", (req, res) => res.json(tours));

// api json/xml/text
app.get("/api/tours", (req, res) => {
  const toursXml =
    '<?xml version="1.0"?><tours>' +
    tours
      .map((p) => `<tour price="${p.price}" id="${p.id}">${p.name}</tour>`)
      .join("") +
    "</tours>";

  const toursText = tours
    .map((p) => `${p.id}: ${p.name} (${p.price})`)
    .join("\n");

  res.format({
    "application/json": () => res.json(tours),
    "application/xml": () => res.type("application/xml").send(toursXml),
    "text/xml": () => res.type("text/xml").send(toursXml),
    "text/plain": () => res.type("text/plain").send(toursText),
  });
});

// api put
app.put("/api/tour/:id", (req, res) => {
  const p = tours.find((p) => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: "No such tour exists" });
  if (req.body.name) p.name = req.body.name;
  if (req.body.price) p.price = req.body.price;
  res.json({ success: true });
});

// api del
app.delete("/api/tour/:id", (req, res) => {
  const idx = tours.findIndex((tour) => tour.id === parseInt(req.params.id));
  if (idx < 0) return res.json({ error: "Такого тура не существует" });
  tours.splice(idx, 1);
  res.json({ success: true });
});

app.listen(3000, () => console.log("Express запущен"));
