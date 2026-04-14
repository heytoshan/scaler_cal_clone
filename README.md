# Cal.com Clone — High-Fidelity Monochrome Scheduling Platform

A premium, full-stack scheduling and booking ecosystem inspired by Cal.com. This project delivers a high-fidelity user experience with a stark, professional monochrome aesthetic, a dynamic booking engine, and advanced scheduling logic.

##  Quick Start

### 1. Backend Initialization
```bash
cd server
npm install
# Configure your SMTP credentials in .env
npm start    # Server runs on http://localhost:5000
```

### 2. Frontend Initialization
```bash
cd client
npm install
npm run dev  # App runs on http://localhost:5173
```

---

##  Architecture & Tech Stack

### High-Fidelity Frontend
*   **React (Vite)**: Lightning-fast development and optimized build performance.
*   **Framer Motion**: Powering complex animations, including the **Dynamic Tool Shuffling** and page transitions.
*   **Tailwind CSS**: Custom monochrome design system with glassmorphic cards and floating navbars.
*   **Lucide React**: 100% reliable, localized vector iconography for a clean developer aesthetic.

### Robust Backend
*   **Node.js / Express**: Scalable, modular API architecture.
*   **PostgreSQL**: Relational database for complex scheduling queries and availability calculations.
*   **Nodemailer**: Real-world SMTP email notifications for booking confirmation and cancellation.

---

##  Advanced Features

###  Advanced Scheduling Engine
*   **Buffer Times**: Prevention of back-to-back fatigue with configurable "Buffer Before" and "Buffer After" windows.
*   **Conflict Detection**: Real-time server-side scanning of existing bookings and buffers to ensure zero overlaps.
*   **Custom Questions**: Define structured JSON fields for each event type to gather essential info from attendees.

###  Visual & UX Excellence
*   **Floating Navigation**: Adaptive, content-aligned navbar with sleek off-white backdrop.
*   **Dynamic Tools Section**: Interactive, mechanical 3-way logo rotation representing a living ecosystem of integrations.
*   **Monochrome Design**: A curated palette of blacks, whites, and subtle grays for a corporate, premium feel.

###  SMTP Notification Ecosystem
*   **Booking Confirmations**: Beautifully formatted HTML emails sent to attendees.
*   **Cancellations**: Instant notifications to sync everyone on schedule changes.
*   **TLS Resilience**: Configured to handle local environment certificate handshakes smoothly.

---

##  Key Modules

1.  **`AdminLayout`**: Minimalist sidebar navigation with "Protocol" branding.
2.  **`MarketingNav`**: Fixed floating navigation for high-conversion landing pages.
3.  **`AvailabilityController`**: Rule-based logic for recurring work hours and specific overrides.
4.  **`BookingController`**: The heart of the platform, managing the lifecycle of every appointment.

##  Design Philosophy
Built with a "Quality-First" approach, this application prioritizes **Visual Excellence** and **Smooth Interaction**. Every transition, from the loading states to the tool swapping, is calibrated to feel premium, state-of-the-art, and production-ready.
