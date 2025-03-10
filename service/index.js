const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = [];
let ratings = [];

var apiRouter = express.Router();
app.use('/api', apiRouter);

//CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ "msg": "Existing user" })
    } else {
        const user = await createUser(req.body.username, req.body.password)
        setAuthCookie(res, user.token)
        res.send({ username: user.username })
    }
})

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ username: user.username});
            return;
        }
    }
    res.status(409).send({ msg: "Unauthorized" }); 
});

// // //DeleteAuth logout a user


// // // Middleware to verify that the user is authorized to call an endpoint


// Get Ratings
apiRouter.get('/ratings', (_req, res) => {
    res.json(ratings);
});

// Submit Rating
apiRouter.post('/rating', (req, res) => {
    ratings = postRating(req.body);
    res.send(ratings);
});

//Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return default page if path is unknown 
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function findUser(field, value) {
    return users.find((u) => u[field] === value);
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);
    return user;
}


function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

function postRating(rating_json) {
    ratings.unshift(rating_json);
    return ratings;
}

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})