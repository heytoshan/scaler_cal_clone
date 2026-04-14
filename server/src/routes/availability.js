const express = require('express');
const router = express.Router();
const {
  getSchedules,
  createSchedule,
  updateSchedule,
  updateRules,
  getAvailableSlots,
  addDateOverride,
  deleteDateOverride,
} = require('../controllers/availabilityController');

router.get('/', getSchedules);
router.post('/', createSchedule);
router.get('/slots', getAvailableSlots);
router.put('/:id', updateSchedule);
router.put('/:id/rules', updateRules);
router.post('/overrides', addDateOverride);
router.delete('/overrides/:id', deleteDateOverride);

module.exports = router;
