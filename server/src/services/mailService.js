const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // This bypasses the TLS error you were seeing
  }
});

const sendBookingConfirmation = async (booking, eventType) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Email credentials not configured. Notification skipped.');
    return;
  }

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: booking.booker_email,
    subject: `Confirmed: ${eventType.title} with Toshan`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 8px;">
        <h2 style="color: #111827; margin-bottom: 24px;">Booking Confirmed</h2>
        <p style="color: #374151; font-size: 16px; margin-bottom: 16px;">
          Hi <strong>${booking.booker_name}</strong>, your meeting has been scheduled.
        </p>
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Event</p>
          <p style="margin: 4px 0 12px 0; color: #111827; font-weight: bold;">${eventType.title}</p>
          
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Time</p>
          <p style="margin: 4px 0 0 0; color: #111827; font-weight: bold;">
            ${new Date(booking.start_time).toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}
          </p>
        </div>
        <p style="color: #6b7280; font-size: 13px;">
          If you need to cancel, you can do so from your dashboard.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

const sendBookingCancellation = async (booking, eventType) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: booking.booker_email,
    subject: `Cancelled: ${eventType.title} with Toshan`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ef4444; border-top: 4px solid #ef4444;">
        <h2 style="color: #111827;">Booking Cancelled</h2>
        <p>Your meeting "<strong>${eventType.title}</strong>" on ${new Date(booking.start_time).toLocaleString()} has been cancelled.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending cancellation email:', error);
  }
};

module.exports = {
  sendBookingConfirmation,
  sendBookingCancellation
};
