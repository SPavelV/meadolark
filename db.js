const credentials = require('./credentials');
const Vacation = require('./models/vacation');
const VacationInSeasonListener = require('./models/vacationInSeasonListener');

// initialize database connection
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const { connectionString } = credentials.mongo[env];
if (!connectionString) {
  console.error('MongoDB connection string missing!');
  process.exit(1);
}
mongoose.connect(connectionString, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB error: ' + err.message);
  process.exit(1);
});
db.once('open', () => console.log('MongoDB connection established'));

// seed vacation data (if necessary)
Vacation.find((err, vacations) => {
  if (err) return console.error(err);
  if (vacations.length) return;

  new Vacation({
    name: 'Однодневный тур в Худ-Ривер',
    slug: 'hood-river-day-trip',
    category: 'Однодневный тур',
    sku: 'HR199',
    description:
      'Проведите день в плавании по реке ' +
      'Колумбия и насладитесь сваренным ' +
      'по традиционным рецептам пивом в Худ-Ривер!',
    location: {
      search: 'Худ-Ривер, Орегон, США',
    },
    price: 99.95,
    tags: [
      'однодневный тур',
      'худ-ривер',
      'плавание',
      'виндсерфинг',
      'пивоварни',
    ],
    inSeason: true,
    maximumGuests: 16,
    available: true,
    packagesSold: 0,
  }).save();

  new Vacation({
    name: 'Отдых в Орегон Коуст',
    slug: 'oregon-coast-getaway',
    category: 'Отдых на выходных',
    sku: 'OC39',
    description:
      'Насладитесь океанским воздухом ' +
      'и причудливыми прибрежными городками!',
    location: {
      search: 'Кэннон Бич, Орегон, США',
    },
    price: 269.95,
    tags: ['отдых на выходных', 'орегон коуст', 'прогулки по пляжу'],
    inSeason: false,
    maximumGuests: 8,
    available: true,
    packagesSold: 0,
  }).save();
  new Vacation({
    name: 'Скалолазание в Бенде',
    slug: 'rock-climbing-in-bend',
    category: 'Приключение',
    sku: 'B99',
    description:
      'Пощекочите себе нервы горным ' +
      'восхождением на пустынной возвышенности.',
    location: {
      search: 'Бенд, Орегон, США',
    },
    price: 289.95,
    tags: [
      'отдых на выходных',
      'бенд',
      'пустынная возвышенность',
      'скалолазание',
    ],
    inSeason: true,
    requiresWaiver: true,
    maximumGuests: 4,
    available: false,
    packagesSold: 0,
    notes:
      'Гид по данному туру в настоящий момент ' +
      'восстанавливается после лыжной травмы.',
  }).save();
});

module.exports = {
  getVacations: async (options = {}) => Vacation.find(options),
  addVacationInSeasonListener: async (email, sku) => {
    await VacationInSeasonListener.updateOne(
      { email },
      { $push: { skus: sku } },
      { upsert: true }
    );
  },
};

module.exports = {
  getVacations: async (options = {}) => Vacation.find(options),
  addVacationInSeasonListener: async (email, sku) => {},
};
