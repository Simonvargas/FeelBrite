const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/', eventsRouter)
    


module.exports = router;