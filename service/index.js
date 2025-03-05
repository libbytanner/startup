const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 1 ? process.argv[2] : 3000;

app.use(express.json());

let users = {};
let ratings = [];
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

//CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing User' })
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: req.body.email})
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ email: user.email });
            return;
        }
        res.status(401).send({ msg: 'Unauthorized' }) 
    }
});

//DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// Get Ratings
apiRouter.get('/rating', verifyAuth, (_req, res) => {
    res.send(ratings);
});

// Submit Rating
apiRouter.post('/rating', verifyAuth, (req, res) => {
    ratings = postRating(req.body);
    res.send(scores);
});

//Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return default page if path is unknown 
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})