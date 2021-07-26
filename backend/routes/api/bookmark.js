const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Event, User, Bookmark} = require('../../db/models');

const router = express.Router();


router.post('/',asyncHandler(async function (req, res) {
  console.log(req.body)
    const event = await Bookmark.create(req.body);
    return res.json(event)
  })
);

router.get('/', asyncHandler(async(req, res, next) => {
  const bookmark = await Bookmark.findAll();
  console.log(bookmark)
  res.json(bookmark)
}))

// router.delete('/:id', asyncHandler( async(req, res) => {
//   // const number = parseInt( req.params.id, 10 );
//   const event = await Event.findByPk(req.params.id);
//   await event.destroy()
//   res.json({})
// }))

// router.delete('/:id', asyncHandler( async(req, res) => {
//   const register = await Bookmark.findByPk(req.params.id);
//   await register.destroy()
//   res.json({})
// }))

router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    let bookmark = await Bookmark.findOne({
      where: { eventId: req.body.eventId, userId: req.body.userId },
    });
    if (bookmark) {
     await bookmark.destroy()
    }
    res.sendStatus(200);
    // console.log(bookmark);
  })
);


module.exports = router;