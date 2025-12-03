const path = require('path');
const { sequelize, User, Game, Review } = require(path.join(__dirname, '../models'));

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { username: 'alice', email: 'alice@example.com' },
      { username: 'bob', email: 'bob@example.com' },
      { username: 'zoie', email: 'zoie@example.com' }
    ]);

    const games = await Game.bulkCreate([
      { title: 'Elden Ring', platform: 'PC', genre: 'RPG', releaseYear: 2022, completionStatus: 'completed' },
      { title: 'Stardew Valley', platform: 'PC', genre: 'Simulation', releaseYear: 2016, completionStatus: 'played' },
      { title: 'Hollow Knight', platform: 'Switch', genre: 'Metroidvania', releaseYear: 2017, completionStatus: 'not started' },
      { title: 'Celeste', platform: 'PC', genre: 'Platformer', releaseYear: 2018 },
      { title: 'Hades', platform: 'PC', genre: 'Roguelike', releaseYear: 2020 }
    ]);

    await Review.bulkCreate([
      { userId: users[0].id, gameId: games[0].id, rating: 9, comment: 'Amazing combat and world.' },
      { userId: users[1].id, gameId: games[1].id, rating: 10, comment: 'Cozy and endless.' },
      { userId: users[2].id, gameId: games[2].id, rating: 8, comment: 'Great atmosphere.' },
      { userId: users[0].id, gameId: games[3].id, rating: 9, comment: 'Tough but rewarding.' }
    ]);

    console.log('Seed complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
