const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Event, User } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async(req, res, next) => {
    try {
    const events = await Event.findAll();
    res.json(events)
    } catch (err) {
        next.err
     }
}))

// router.get('/registration', restoreUser, asyncHandler)



module.exports = router;
