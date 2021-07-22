const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Event, User } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async(req, res, next) => {
    const events = await Event.findAll();
    res.json(events)
}))


router.post('/',asyncHandler(async function (req, res) {
      const event = await Event.create(req.body);
      return res.json(event)
    })
  );

router.get('/:id', asyncHandler(async function (req, res) {
  const id = req.params.id
  const event = await Event.findByPk(id)
  return res.json(event)
}))

router.put('/:id', asyncHandler(async function (req, res) {
  // const id = req.params.id
  const event = await Event.update(req.body)
  const newUpdate = await Event.findByPk(event);
  return res.json(newUpdate)
}))

router.delete("/:id", asyncHandler(async function (req, res) {
  const itemId = await Events.destroy(req.params.id);
  return res.json({ itemId });
}));



module.exports = router;
