const express = require('express');
const router = express.Router();
const {
  getAllEventTypes,
  getEventTypeBySlug,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
  toggleEventType,
} = require('../controllers/eventTypesController');

router.get('/', getAllEventTypes);
router.get('/by-slug/:slug', getEventTypeBySlug);
router.get('/:id', getEventTypeById);
router.post('/', createEventType);
router.put('/:id', updateEventType);
router.delete('/:id', deleteEventType);
router.patch('/:id/toggle', toggleEventType);

module.exports = router;
