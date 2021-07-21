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

module.exports = router;
