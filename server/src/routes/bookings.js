const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBookingByUid,
  createBooking,
  cancelBooking,
  rescheduleBooking,
} = require('../controllers/bookingsController');

router.get('/', getAllBookings);
router.get('/:uid', getBookingByUid);
router.post('/', createBooking);
router.patch('/:id/cancel', cancelBooking);
router.patch('/:id/reschedule', rescheduleBooking);

module.exports = router;
