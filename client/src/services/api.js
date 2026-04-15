import axios from 'axios';

const API_BASE = 'https://scaler-cal-clone.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event Types
export const eventTypesAPI = {
  getAll: () => api.get('/event-types'),
  getById: (id) => api.get(`/event-types/${id}`),
  getBySlug: (slug) => api.get(`/event-types/by-slug/${slug}`),
  create: (data) => api.post('/event-types', data),
  update: (id, data) => api.put(`/event-types/${id}`, data),
  delete: (id) => api.delete(`/event-types/${id}`),
  toggle: (id) => api.patch(`/event-types/${id}/toggle`),
};

// Availability
export const availabilityAPI = {
  getSchedules: () => api.get('/availability'),
  createSchedule: (data) => api.post('/availability', data),
  updateSchedule: (id, data) => api.put(`/availability/${id}`, data),
  updateRules: (id, rules) => api.put(`/availability/${id}/rules`, { rules }),
  getSlots: (date, eventTypeSlug) => api.get('/availability/slots', { params: { date, eventTypeSlug } }),
  addOverride: (data) => api.post('/availability/overrides', data),
  deleteOverride: (id) => api.delete(`/availability/overrides/${id}`),
};

// Bookings
export const bookingsAPI = {
  getAll: (params) => api.get('/bookings', { params }),
  getByUid: (uid) => api.get(`/bookings/${uid}`),
  create: (data) => api.post('/bookings', data),
  cancel: (id, reason) => api.patch(`/bookings/${id}/cancel`, { cancellation_reason: reason }),
  reschedule: (id, data) => api.patch(`/bookings/${id}/reschedule`, data),
};

// User
export const userAPI = {
  getByUsername: (username) => api.get(`/user/${username}`),
  getEventTypes: (username) => api.get(`/user/${username}/event-types`),
};

export default api;
