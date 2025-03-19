const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('soundscope');
const users = db.collection('users');
const ratings = db.collection('ratings');

(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log('Connected to database');
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

function getUser(username) {
    return users.findOne({ username: username});
}

function getUserByToken(token) {
    return users.findOne({ token: token});
}

async function createUser(user) {
    await users.insertOne(user);
}

async function updateUser(user) {
    await users.updateOne({ username: user.username}, { $set: user});
}

async function addRating(rating) {
    await ratings.insertOne(rating);
}

function getUserRatings(username) {
    const cursor = ratings.find({ user: username });
    return cursor.toArray();
}

function getRatings() {
    const cursor = ratings.find({ limit: 25 });
    return cursor.toArray();
}


module.exports = {
    getUser,
    getUserByToken,
    createUser,
    updateUser,
    addRating,
    getUserRatings,
    getRatings,
}