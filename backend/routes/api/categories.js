const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Category } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async(req, res, next) => {
    const events = await Category.findAll();
    res.json(events)
}))


router.post('/',asyncHandler(async function (req, res) {
      const event = await Categories.create(req.body);
      return res.json(event)
    })
  );

// router.get('/:id', asyncHandler(async function (req, res) {
//   const id = req.params.id
//   const event = await Categories.findByPk(id)
//   return res.json(event)
// }))

// router.patch('/:id', asyncHandler(async function (req, res) {
//   const number = parseInt( req.params.id, 10 );
//   const { hostId, name, details, image, date, location } = req.body
//   const event = await Event.findByPk(number)
//   const newEvent = event.update({name, image, details, date, location })
//   return res.json(newEvent)
// }))



router.delete('/:id', asyncHandler( async(req, res) => {
  // const number = parseInt( req.params.id, 10 );
  const event = await Event.findByPk(req.params.id);
  await event.destroy()
  res.json({})
}))



// router.delete("/:id", asyncHandler(async function (req, res) {
//   const itemId = await Events.destroy(req.params.id);
//   return res.json({ itemId });
// }));

module.exports = router;
