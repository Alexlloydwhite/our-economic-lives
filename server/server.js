const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const blockRouter = require('./routes/block.router.js');
const uploadRouter = require('./routes/upload.router.js');
const adminRouter = require('./routes/admin.router.js');
const coachRouter = require('./routes/coach.router');
const clientRouter = require('./routes/client.router');
const pyramidRouter = require('./routes/pyramid.router.js');
const buildingBlocksRouter = require('./routes/buildingBlocks.router.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/block', blockRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/admin', adminRouter);
app.use('/api/coach', coachRouter);
app.use('/api/client', clientRouter);
app.use('/api/pyramid', pyramidRouter);
app.use('/api/building-blocks', buildingBlocksRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
