const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('soundscope');

(async function testConnection() {
    try {
      await db.command({ ping: 1 });
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

function getUser(username) {
    return userCollection.findOne({ username: username});
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token});
}

async function createUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ username: user.username}, { $set: user});
}

async function addRating(rating) {
    await ratingCollection.insertOne({rating})
}

function getUserRatings(username) {
    return ratingCollection.find({ user: username})
}

function getRatings() {
    const options = {
        limit: 25
    };
    const cursor = ratingCollection.find(options);
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