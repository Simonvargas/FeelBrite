const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Event, User, Registration } = require('../../db/models');

const router = express.Router();

router.post('/',asyncHandler(async function (req, res) {
    const event = await Registration.create(req.body);
    return res.json(event)
  })
);