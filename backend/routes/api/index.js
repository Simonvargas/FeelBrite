const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js')
const registrationRouter = require('./registration')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter)
router.use('/registration', registrationRouter)
    

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;