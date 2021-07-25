const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js')
const registrationRouter = require('./registration')
const categoriesRouter = require('./categories')
const bookmarkRouter = require('./bookmark')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter)
router.use('/registration', registrationRouter)
router.use('/categories', categoriesRouter)
router.use('/bookmark', bookmarkRouter)

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;