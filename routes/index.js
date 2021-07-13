const express = require('express');
const { APPLY_LEAVE, GET_LEAVE, GET_PENDING_LEAVE, GET_ALL_LEAVE, APPROVE_LEAVE, REJECT_LEAVE } = require('../controllers');
const router = express.Router();

router.post('/apply', APPLY_LEAVE);
router.get('/leave/user/:userId', GET_ALL_LEAVE);
router.get('/leave/pending/:userId', GET_PENDING_LEAVE);
router.put('/leave/approved', APPROVE_LEAVE);
router.put('/leave/rejected', REJECT_LEAVE);
router.get('/leave/:id', GET_LEAVE)
module.exports = router