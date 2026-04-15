import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import AdminLayout from './components/AdminLayout';
import EventTypesPage from './pages/EventTypesPage';
import AvailabilityPage from './pages/AvailabilityPage';
import BookingsPage from './pages/BookingsPage';
import PublicProfilePage from './pages/PublicProfilePage';
import PublicBookingPage from './pages/PublicBookingPage';
import BookingConfirmation from './pages/BookingConfirmation';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import EnterprisePage from './pages/EnterprisePage';
import PricingPage from './pages/PricingPage';
import DevelopersPage from './pages/DevelopersPage';
import SettingsPage from './pages/SettingsPage';
import './index.css';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Root Route - Landing Page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          {/* Admin Dashboard Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/event-types" element={<EventTypesPage />} />
            <Route path="/availability" element={<AvailabilityPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Public Routes */}
          <Route path="/:username" element={<PublicProfilePage />} />
          <Route path="/:username/:slug" element={<PublicBookingPage />} />
          <Route path="/booking/confirmation/:uid" element={<BookingConfirmation />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
