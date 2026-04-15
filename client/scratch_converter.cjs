const fs = require('fs');

const htmlInput = `<!-- NAV -->
<nav>
  <div class="nav-left">
    <div class="nav-logo">
      <div class="nav-logo-icon">C</div>
      <span>Cal.com</span>
    </div>
    <div class="nav-links">
      <a href="/">Solutions <span style="font-size:10px;">▾</span></a>
      <a href="/">Enterprise</a>
      <a href="/">Cal.ai <span style="font-size:9px; background:#f3f4f6; padding:1px 5px; border-radius:3px; color:#6b7280;">new</span></a>
      <a href="/">Open Source</a>
      <a href="/">Resources <span style="font-size:10px;">▾</span></a>
      <a href="/">More <span style="font-size:10px;">▾</span></a>
      <a href="/">Pricing</a>
    </div>
  </div>
  <div class="nav-right">
    <a href="/event-types" class="btn-ghost">Sign in</a>
    <a href="/event-types" class="btn-primary-nav">Get started</a>
  </div>
</nav>

<!-- HERO -->
<section>
  <div class="hero">
    <div class="hero-left">
      <div class="hero-badge">
        <span>📅</span> Cal.com for Enterprise
        <span class="arrow">→</span>
      </div>
      <h1 class="hero-title" style="font-size:52px; font-weight:800; line-height:1.08; letter-spacing:-2px; margin-bottom:20px;">The better way to<br>schedule your<br>meetings</h1>
      <p style="font-size:16px; color:#6b7280; max-width:440px; line-height:1.65; margin-bottom:28px;">Cal is your scheduling automation platform for catching up with others, scheduling meetings, and everything in between.</p>
      <div class="hero-actions">
        <a href="/event-types" class="google-btn">
          <div class="google-icon"></div>
          Sign up with Google
        </a>
      </div>
      <div style="display:flex; align-items:center; gap:8px; margin:14px 0 0; font-size:13px; color:#6b7280;">
        <span style="color:#6b7280; font-size:12px;">—— or ——</span>
      </div>
      <div style="margin-top:10px;">
        <input type="email" placeholder="Enter your work email" style="border:1px solid #d1d5db; padding:10px 16px; border-radius:8px; font-size:13px; width:280px; margin-right:8px; outline:none; font-family:inherit;">
        <a href="/event-types" style="background:#111827; color:white; padding:10px 18px; border-radius:8px; font-size:13px; font-weight:600; display:inline-block;">Sign up free →</a>
      </div>
      <p style="font-size:11px; color:#9ca3af; margin-top:8px;">No credit card required</p>

      <div class="review-badges" style="margin-top:20px; padding-top:0; border:none;">
        <div class="review-badge">
          <span class="trustpilot">Trustpilot</span>
          <span class="stars">★★★★★</span>
          <span class="review-count">4.8</span>
        </div>
        <div class="review-badge">
          <span class="ph-orange">🔶</span>
          <span class="stars">★★★★★</span>
          <span class="review-count">#1 Product</span>
        </div>
        <div class="review-badge">
          <span class="g2-red">G2</span>
          <span class="stars">★★★★★</span>
          <span class="review-count">4.7</span>
        </div>
      </div>
    </div>

    <div class="hero-visual">
      <div class="cal-card">
        <div class="cal-card-top">
          <div class="cal-profile">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <div style="width:32px;height:32px;border-radius:50%;background:#374151;display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:700;">R</div>
              <div>
                <div style="font-size:12px;font-weight:600;color:#111827;">Rick Sanchez</div>
                <div style="font-size:10px;color:#9ca3af;">rick@acme.com</div>
              </div>
            </div>
            <div style="font-size:11px;font-weight:600;color:#374151;margin-bottom:6px;">Office Hours</div>
            <div style="font-size:11px;color:#6b7280;display:flex;align-items:center;gap:4px;margin-bottom:3px;">🕐 30 min · One-on-one</div>
            <div style="font-size:11px;color:#6b7280;display:flex;align-items:center;gap:4px;margin-bottom:3px;">📹 Zoom Video</div>
            <div style="font-size:11px;color:#6b7280;display:flex;align-items:center;gap:4px;">📋 1 question</div>
          </div>
          <div class="cal-mini-calendar">
            <div class="mini-cal-header">
              <span>◀</span> <span>May 2025</span> <span>▶</span>
            </div>
            <div class="mini-cal-days">
              <div class="mini-day header">Su</div>
              <div class="mini-day header">Mo</div>
              <div class="mini-day header">Tu</div>
              <div class="mini-day header">We</div>
              <div class="mini-day header">Th</div>
              <div class="mini-day header">Fr</div>
              <div class="mini-day header">Sa</div>

              <div class="mini-day"></div>
              <div class="mini-day"></div>
              <div class="mini-day"></div>
              <div class="mini-day">1</div>
              <div class="mini-day">2</div>
              <div class="mini-day">3</div>
              <div class="mini-day">4</div>

              <div class="mini-day">5</div>
              <div class="mini-day">6</div>
              <div class="mini-day">7</div>
              <div class="mini-day highlighted">8</div>
              <div class="mini-day highlighted">9</div>
              <div class="mini-day highlighted">10</div>
              <div class="mini-day">11</div>

              <div class="mini-day">12</div>
              <div class="mini-day">13</div>
              <div class="mini-day active">14</div>
              <div class="mini-day">15</div>
              <div class="mini-day">16</div>
              <div class="mini-day highlighted">17</div>
              <div class="mini-day">18</div>

              <div class="mini-day">19</div>
              <div class="mini-day">20</div>
              <div class="mini-day today">21</div>
              <div class="mini-day">22</div>
              <div class="mini-day highlighted">23</div>
              <div class="mini-day highlighted">24</div>
              <div class="mini-day">25</div>

              <div class="mini-day">26</div>
              <div class="mini-day">27</div>
              <div class="mini-day">28</div>
              <div class="mini-day highlighted">29</div>
              <div class="mini-day highlighted">30</div>
              <div class="mini-day highlighted">31</div>
              <div class="mini-day"></div>
            </div>
          </div>
        </div>
        <div style="font-size:12px;font-weight:600;color:#111827;margin-bottom:10px;">Wednesday, May 14</div>
        <div class="cal-time-slots">
          <div class="time-slot">9:00am</div>
          <div class="time-slot">9:30am</div>
          <div class="time-slot selected">10:00am</div>
          <div class="time-slot">10:30am</div>
          <div class="time-slot">11:00am</div>
          <div class="time-slot">2:00pm</div>
        </div>
        <div style="font-size:10px;color:#9ca3af;margin-top:8px;text-align:center;">Showing times in America/New_York</div>

        <div style="margin-top:14px;padding-top:12px;border-top:1px solid #f3f4f6;display:flex;gap:10px;align-items:center;">
          <div style="display:flex;gap:4px;">
            <div style="width:20px;height:20px;border-radius:50%;background:#4285f4;"></div>
            <div style="width:20px;height:20px;border-radius:50%;background:#0078d4;margin-left:-6px;border:2px solid white;"></div>
            <div style="width:20px;height:20px;border-radius:50%;background:#555;margin-left:-6px;border:2px solid white;"></div>
          </div>
          <span style="font-size:10px;color:#6b7280;">New event added to Cal.com</span>
          <span style="font-size:10px;color:#10b981;font-weight:600;margin-left:auto;">✓ Confirmed</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- LOGOS -->
<div class="logos-section">
  <p>Scheduling software trusted by growing teams everywhere</p>
  <div class="logos-row">
    <span class="logo-item">deel.</span>
    <span class="logo-item" style="font-style:italic; letter-spacing:-1px;">f</span>
    <span class="logo-item">ramp</span>
    <span class="logo-item">🔺 PlanetScale</span>
    <span class="logo-item">coinbase</span>
    <span class="logo-item" style="font-size:12px;">elevenl<span style="color:#999;">abs</span></span>
  </div>
</div>

<!-- HOW IT WORKS -->
<div style="padding: 80px 40px; max-width:1100px; margin:0 auto;">
  <div class="section-header">
    <div style="display:flex;justify-content:center;margin-bottom:12px;">
      <div style="border:1px solid #e5e7eb;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:600;color:#374151;display:flex;align-items:center;gap:6px;text-transform:uppercase;letter-spacing:0.5px;">
        <span style="width:6px;height:6px;background:#006ce0;border-radius:50%;display:inline-block;"></span> How it works
      </div>
    </div>
    <div style="display:flex;justify-content:center;gap:12px;margin-bottom:12px;">
      <span style="border:1px solid #e5e7eb;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:600;background:#111827;color:white;">Get started</span>
      <span style="border:1px solid #e5e7eb;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:500;color:#374151;">Share a demo →</span>
    </div>
    <h2 class="section-title">With us, appointment scheduling is easy</h2>
    <p class="section-sub">We've stripped away the complexity of scheduling, so you can focus on the meeting.</p>
  </div>

  <div class="how-cards">
    <!-- Card 1 -->
    <div class="how-card">
      <div class="step-num">Step 01</div>
      <h3>Connect your calendar</h3>
      <p>Connect your existing calendar so Cal.com can see when you're available and when you're not.</p>
      <div class="card-visual-cal">
        <div class="sync-row"><div class="sync-icon sync-google">G</div><span class="sync-label">Google Calendar</span><span class="sync-check">✓</span></div>
        <div class="sync-row"><div class="sync-icon sync-apple">⌘</div><span class="sync-label">Apple Calendar</span><span class="sync-check">✓</span></div>
        <div class="sync-row"><div class="sync-icon sync-outlook">O</div><span class="sync-label">Outlook</span><span class="sync-check">✓</span></div>
        <div style="margin-top:10px;border:1px solid #e5e7eb;border-radius:6px;padding:8px 10px;font-size:11px;">
          <div style="font-weight:600;color:#111827;margin-bottom:4px;">Cal.com →</div>
          <div style="color:#9ca3af;font-size:10px;">cal.com/rick</div>
        </div>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="how-card">
      <div class="step-num">Step 02</div>
      <h3>Set your availability</h3>
      <p>Set specific working hours, limit meetings per day, and prevent people from scheduling last minute.</p>
      <div class="avail-visual">
        <div class="avail-day">
          <div class="toggle on"></div>
          <span style="font-size:12px;">Mon</span>
          <span class="avail-times">9:00am – 5:00pm</span>
        </div>
        <div class="avail-day">
          <div class="toggle on"></div>
          <span style="font-size:12px;">Tue</span>
          <span class="avail-times">9:00am – 5:00pm</span>
        </div>
        <div class="avail-day">
          <div class="toggle on"></div>
          <span style="font-size:12px;">Wed</span>
          <span class="avail-times">9:00am – 5:00pm</span>
        </div>
        <div class="avail-day">
          <div class="toggle off"></div>
          <span style="font-size:12px;">Thu</span>
          <span class="avail-na">Unavailable</span>
        </div>
        <div class="avail-day">
          <div class="toggle on"></div>
          <span style="font-size:12px;">Fri</span>
          <span class="avail-times">9:00am – 3:00pm</span>
        </div>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="how-card">
      <div class="step-num">Step 03</div>
      <h3>Choose how to meet</h3>
      <p>Specify how you would like to meet — in person, video call, or phone. Cal.com handles the rest.</p>
      <div class="share-visual">
        <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-top:12px;">
          <div class="share-person-row">
            <div class="avatar-circle dark" style="display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:700;">R</div>
            <div style="color:#d1d5db;font-size:20px;">→</div>
            <div class="avatar-circle" style="display:flex;align-items:center;justify-content:center;color:#6b7280;font-size:13px;font-weight:700;">?</div>
            <div style="color:#d1d5db;font-size:20px;">→</div>
            <div class="avatar-circle" style="background:#6366f1;display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:700;">J</div>
          </div>
          <div style="font-size:11px;color:#9ca3af;text-align:center;margin-top:8px;">Share link → Anyone books → Confirmed</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ALL-PURPOSE FEATURES -->
<div style="background:#f9fafb;padding:80px 0;">
  <div style="max-width:1100px;margin:0 auto;padding:0 40px;">
    <div class="section-header">
      <div style="display:flex;justify-content:center;margin-bottom:12px;">
        <div style="border:1px solid #e5e7eb;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:600;color:#374151;display:flex;align-items:center;gap:6px;text-transform:uppercase;letter-spacing:0.5px;">
          <span style="width:6px;height:6px;background:#006ce0;border-radius:50%;display:inline-block;"></span> Features
        </div>
      </div>
      <div style="display:flex;justify-content:center;gap:12px;margin-bottom:12px;">
        <span style="border:1px solid #e5e7eb;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:600;background:#111827;color:white;">Get started</span>
        <span style="border:1px solid #e5e7eb;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:500;color:#374151;">Share a demo →</span>
      </div>
      <h2 class="section-title">Your all-purpose scheduling app</h2>
      <p class="section-sub">The only tool you need to manage your time and connect with others.</p>
    </div>

    <div class="bento">
      <!-- Notices & Buffers -->
      <div class="bento-card">
        <h3>Avoid meeting overload</h3>
        <p>Set daily limits and add buffer time to keep your schedule manageable.</p>
        <div class="buffer-ui">
          <div style="font-size:11px;font-weight:600;color:#374151;margin-bottom:6px;">Notices and buffers</div>
          <div class="buffer-row">
            <span class="buffer-label">Minimum notice</span>
            <span class="buffer-select">30 minutes</span>
          </div>
          <div class="buffer-row">
            <span class="buffer-label">Buffer before event</span>
            <span class="buffer-select">10 mins</span>
          </div>
          <div class="buffer-row">
            <span class="buffer-label">Buffer after event</span>
            <span class="buffer-select">10 mins</span>
          </div>
          <div class="buffer-row">
            <span class="buffer-label">Time slot intervals</span>
            <span class="buffer-select">15 mins</span>
          </div>
        </div>
      </div>

      <!-- Stand out with a custom booking link -->
      <div class="bento-card wide">
        <h3>Stand out with a custom booking link</h3>
        <p>Personalize your booking link and create a professional experience that matches your brand.</p>
        <div class="booking-link-ui">
          <div class="booking-link-url">cal.com/faith</div>
          <div class="booking-event-row">
            <div class="event-dot"></div>
            <div>
              <div class="event-name">Discovery Call</div>
              <div class="event-duration">30 min · Engineering/Design</div>
            </div>
          </div>
          <div class="booking-event-row">
            <div class="event-dot green"></div>
            <div>
              <div class="event-name">Product Demo</div>
              <div class="event-duration">60 min · Video Call</div>
            </div>
          </div>
          <div style="margin-top:8px;display:flex;gap:6px;">
            <div style="background:#f3f4f6;border:1px solid #e5e7eb;border-radius:4px;padding:3px 8px;font-size:10px;color:#374151;">Edit link</div>
            <div style="background:#111827;color:white;border-radius:4px;padding:3px 8px;font-size:10px;font-weight:600;">Copy link</div>
          </div>
        </div>
      </div>

      <!-- Streamline -->
      <div class="bento-card wide">
        <h3>Streamline your bookers' experience</h3>
        <p>Build routing forms to direct leads and clients to the right person based on their needs.</p>
        <div class="cal-dropdown-ui">
          <div style="font-size:11px;font-weight:600;margin-bottom:8px;color:#374151;">Sort by calendar <span style="color:#6b7280;font-weight:400;">▾</span></div>
          <div class="dropdown-row">
            <span style="color:#374151;">Team round robin</span>
            <span class="dropdown-chip">Active</span>
          </div>
          <div class="dropdown-row">
            <span style="color:#374151;">Sales discovery</span>
            <span class="dropdown-chip blue">Routing</span>
          </div>
          <div class="dropdown-row">
            <span style="color:#374151;">Support tier 1</span>
            <span class="dropdown-chip">Active</span>
          </div>
        </div>
      </div>

      <!-- Reduce no-shows -->
      <div class="bento-card">
        <h3>Reduce no-shows with automated meeting reminders</h3>
        <p>Send automated reminders to keep all invitees on track.</p>
        <div class="reminder-ui">
          <div class="reminder-item">
            <div class="reminder-icon ri-email">✉</div>
            <span class="reminder-text">Email reminder</span>
            <span class="reminder-time">1 hour before</span>
          </div>
          <div class="reminder-item">
            <div class="reminder-icon ri-sms">💬</div>
            <span class="reminder-text">SMS reminder</span>
            <span class="reminder-time">24 hours before</span>
          </div>
          <div class="reminder-item">
            <div class="reminder-icon ri-email">✉</div>
            <span class="reminder-text">Follow-up email</span>
            <span class="reminder-time">1 hour after</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ...and so much more! -->
    <div style="margin-top:60px; text-align:center;">
      <h3 style="font-size:22px; font-weight:800; letter-spacing:-0.5px; margin-bottom:28px;">...and so much more!</h3>
      <div class="more-grid">
        <div class="more-item"><div class="more-icon">💳</div>Accept payments</div>
        <div class="more-item"><div class="more-icon">📹</div>Built-in video conferencing</div>
        <div class="more-item"><div class="more-icon">📋</div>Data booking sites</div>
        <div class="more-item"><div class="more-icon">🔒</div>Privacy first</div>
        <div class="more-item"><div class="more-icon">🌍</div>99+ languages</div>
        <div class="more-item"><div class="more-icon">🔗</div>Easy embeds</div>
        <div class="more-item"><div class="more-icon">⭐</div>All your apps</div>
        <div class="more-item"><div class="more-icon">🎨</div>Simple customization</div>
      </div>
    </div>
  </div>
</div>

<!-- TESTIMONIALS -->
<div class="testimonials-section">
  <div style="display:flex;justify-content:center;margin-bottom:12px;">
    <div style="border:1px solid #e5e7eb;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:600;color:#374151;display:flex;align-items:center;gap:6px;text-transform:uppercase;letter-spacing:0.5px;">
      <span style="width:6px;height:6px;background:#006ce0;border-radius:50%;display:inline-block;"></span> Testimonials
    </div>
  </div>
  <h2 class="section-title" style="margin-bottom:8px;">Don't just take our word for it</h2>
  <p class="section-sub" style="margin-bottom:40px;">See what successful founders and creators are saying about Cal.com</p>

  <div class="testimonial-grid" style="margin-bottom:0;">
    <div class="t-card">
      <p style="font-style:italic;">"Just gave it a go and it's definitely the easiest meeting I've ever scheduled!"</p>
      <div class="t-author">
        <div class="t-avatar b1"></div>
        <div>
          <div class="t-name">Guillermo Rauch</div>
          <div class="t-handle">@rauchg · CEO, Vercel</div>
        </div>
      </div>
    </div>
    <div class="t-card">
      <p style="font-style:italic;">"Finally made the move. After I couldn't find how to do the Calendly dashboard."</p>
      <div class="t-author">
        <div class="t-avatar b2"></div>
        <div>
          <div class="t-name">Alexis Ohanian</div>
          <div class="t-handle">@alexisohanian · Founder, 776</div>
        </div>
      </div>
    </div>
    <div class="t-card">
      <p style="font-style:italic;">"Cal.com is the best scheduling tool I've ever used. Incredibly powerful and flexible."</p>
      <div class="t-author">
        <div class="t-avatar b3"></div>
        <div>
          <div class="t-name">Peer Richelsen</div>
          <div class="t-handle">@peer_rich · Co-founder, Cal.com</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- INTEGRATIONS -->
<div style="padding:0 40px 60px; background:white;">
  <div class="integrations-section">
    <div class="integrations-text">
      <div style="font-size:10px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">App Store</div>
      <h2>All your key tools in-sync with your meetings</h2>
      <p>Connect with Google Meet, Zoom, Stripe, Salesforce, HubSpot and 50+ other tools.</p>
      <div style="display:flex;gap:10px;">
        <a href="/event-types" class="btn-white">Get started</a>
        <a href="/event-types" style="border:1px solid #374151;color:#d1d5db;padding:9px 20px;border-radius:20px;font-size:13px;font-weight:600;display:inline-block;">Explore apps</a>
      </div>
    </div>
    <div class="integrations-icons">
      <div class="int-icon int-google">G</div>
      <div class="int-icon int-zoom">Z</div>
      <div class="int-icon int-teams">T</div>
      <div class="int-icon" style="background:#222;">🍎</div>
      <div class="int-icon int-stripe">S</div>
      <div class="int-icon int-hubspot">H</div>
      <div class="int-icon int-zapier">⚡</div>
      <div class="int-icon int-salesforce">☁</div>
    </div>
  </div>
</div>

<!-- SEE WHY USERS LOVE CAL -->
<div class="users-section">
  <div style="display:flex;justify-content:center;margin-bottom:12px;">
    <div style="border:1px solid #d1d5db;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:600;color:#374151;display:flex;align-items:center;gap:6px;text-transform:uppercase;letter-spacing:0.5px;">
      <span style="width:6px;height:6px;background:#006ce0;border-radius:50%;display:inline-block;"></span> Social Proof
    </div>
  </div>
  <div style="display:flex;justify-content:center;gap:12px;margin-bottom:16px;">
    <span style="border:1px solid #e5e7eb;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:600;background:#111827;color:white;">Get started</span>
    <span style="border:1px solid #e5e7eb;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:500;color:#374151;">Share a demo →</span>
  </div>
  <h2 class="section-title" style="margin-bottom:8px;">See why our users love Cal.com</h2>
  <p class="section-sub" style="margin-bottom:40px;">Read the most recent reviews from teams and individuals.</p>

  <div class="users-grid">
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua1"></div><div><div class="user-name">David Duyen</div><div class="user-handle">@dduyen</div></div></div>
      <p class="user-text">Switching out as an alternative to Calendly and it's so much better. Open source, more customizable, amazing.</p>
    </div>
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua2"></div><div><div class="user-name">Ernie M.</div><div class="user-handle">@ernie_m</div></div></div>
      <p class="user-text">It's so well thought out. A lot of care has been put into this product. Officially switching from @Calendly to @CalDotCom</p>
    </div>
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua3"></div><div><div class="user-name">JJ Hopkins</div><div class="user-handle">@jjhopkins</div></div></div>
      <p class="user-text">Officially switching from @Calendly to Cal.com. Love the clean interface and the open source model.</p>
    </div>
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua4"></div><div><div class="user-name">Yesenia</div><div class="user-handle">@yesenia</div></div></div>
      <p class="user-text">Last booked appointment was via the morning. Just discovered that with this routing, client bookings just fly in!</p>
    </div>
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua5"></div><div><div class="user-name">Fabrizio Vitale</div><div class="user-handle">@fvitale</div></div></div>
      <p class="user-text">Cal.com is an amazing tool. The booking form customization, calendar booking flexibility make it a great choice.</p>
    </div>
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua6"></div><div><div class="user-name">Mangipudi Mhompson</div><div class="user-handle">@mmhompson</div></div></div>
      <p class="user-text">Since moving to Cal.com: Calendar is syncing well with all my calendars! Definitely a Pro user from now on.</p>
    </div>
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua7"></div><div><div class="user-name">RD</div><div class="user-handle">@rd_dev</div></div></div>
      <p class="user-text">Long time Calendly user here. First time earning from Cal.com – took less than 5 mins. No complaints!</p>
    </div>
    <div class="user-card">
      <div class="user-header"><div class="user-avatar ua8"></div><div><div class="user-name">Karan Rai</div><div class="user-handle">@karanrai</div></div></div>
      <p class="user-text">Without a doubt the best scheduling SaaS out there for complex and enterprise scheduling use cases.</p>
    </div>
  </div>

  <div style="text-align:center;margin-top:28px;">
    <span class="show-more">Show more</span>
  </div>

  <div style="border-top:1px solid #e5e7eb; margin-top:40px;padding-top:24px;display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;">
    <span class="logo-item">deel.</span>
    <span class="logo-item" style="font-style:italic;">f</span>
    <span class="logo-item">ramp</span>
    <span class="logo-item">🔺 PlanetScale</span>
    <span class="logo-item">coinbase</span>
  </div>
</div>

<!-- CTA -->
<div class="cta-section">
  <h2>Smarter, simpler scheduling</h2>
  <div class="cta-actions">
    <a href="/event-types" class="btn-cta">Get started</a>
    <a href="/event-types" class="btn-cta-outline">Talk to Sales →</a>
  </div>
  <div style="display:flex;justify-content:center;align-items:center;gap:10px;">
    <div class="face-stack">
      <div class="face f1"></div>
      <div class="face f2"></div>
      <div class="face f3"></div>
      <div class="face f4"></div>
      <div class="face f5"></div>
    </div>
    <div>
      <div class="star-row">★★★★★</div>
      <div style="font-size:11px;color:#6b7280;">Loved by 10,000+ teams</div>
    </div>
    <div style="display:flex;gap:10px;margin-left:20px;font-size:12px;color:#6b7280;align-items:center;">
      <span style="color:#00b67a;font-weight:700;">Trustpilot ★★★★★</span>
      <span>G2 ★★★★★</span>
      <span style="color:#da552f;font-weight:700;">PH ★★★★★</span>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-logo">
        <div class="footer-logo-icon">C</div>
        <span>Cal.com</span>
      </div>
      <p class="footer-desc">Scheduling infrastructure for everyone. Open source & built with ❤️</p>
      <div class="footer-lang">🌍 English</div>
      <div class="footer-apps">
        <div class="app-badge"><span class="app-icon">🍎</span><div><div style="font-size:9px;color:#9ca3af;">Download on the</div><div style="font-size:12px;font-weight:600;">App Store</div></div></div>
        <div class="app-badge"><span class="app-icon">▶</span><div><div style="font-size:9px;color:#9ca3af;">Get it on</div><div style="font-size:12px;font-weight:600;">Google Play</div></div></div>
      </div>
    </div>

    <div class="footer-col">
      <h4>Solutions</h4>
      <a href="/event-types">Cal.com Apps</a>
      <a href="/event-types">Sales</a>
      <a href="/event-types">For Individuals</a>
      <a href="/event-types">For Teams</a>
      <a href="/event-types">Enterprise</a>
      <a href="/event-types">Startups</a>
    </div>

    <div class="footer-col">
      <h4>Use Cases</h4>
      <a href="/event-types">Appointment</a>
      <a href="/event-types">Scheduling</a>
      <a href="/event-types">Expert Bookings</a>
      <a href="/event-types">B2B Meetings</a>
      <a href="/event-types">Professional</a>
      <a href="/event-types">Recruiters</a>
    </div>

    <div class="footer-col">
      <h4>Features</h4>
      <a href="/event-types">Calendar sync</a>
      <a href="/event-types">Event types</a>
      <a href="/event-types">Embed</a>
      <a href="/event-types">Routing Forms</a>
      <a href="/event-types">Teams</a>
      <a href="/event-types">Workflows</a>
    </div>

    <div class="footer-col">
      <h4>Resources</h4>
      <a href="/event-types">Blog</a>
      <a href="/event-types">Docs</a>
      <a href="/event-types">Changelog</a>
      <a href="/event-types">OSS Friends</a>
      <a href="/event-types">Hiring</a>
      <a href="/event-types">Nurses</a>
      <a href="/event-types">London</a>
    </div>

    <div class="footer-col">
      <h4>Company</h4>
      <a href="/event-types">About</a>
      <a href="/event-types">Blog</a>
      <a href="/event-types">Careers</a>
      <a href="/event-types">Privacy</a>
      <a href="/event-types">Shopping</a>
      <a href="/event-types">Security</a>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-bottom-logos">
      <span class="f-logo-text">deel.</span>
      <span class="f-logo-text" style="font-style:italic;">f</span>
      <span class="f-logo-text">ramp</span>
      <span class="f-logo-text">🔺 PlanetScale</span>
      <span class="f-logo-text">coinbase</span>
    </div>
    <div class="footer-bottom-right">© 2025 Cal.com, Inc. · Privacy · Terms · Security</div>
  </div>
</footer>
`;

function parseStyle(styleStr) {
  if (!styleStr) return "{}";
  const rules = styleStr.split(';').map(s => s.trim()).filter(Boolean);
  const obj = {};
  for (const rule of rules) {
    const [key, ...valueParts] = rule.split(':');
    if (!key) continue;
    const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const val = valueParts.join(':').trim();
    obj[camelKey] = val;
  }
  return JSON.stringify(obj);
}

let jsx = htmlInput
  .replace(/class=/g, 'className=')
  .replace(/<input([^>]*[^/])>/g, '<input$1 />')
  .replace(/<br>/g, '<br />');

jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
  return "style={" + parseStyle(p1) + "}";
});

jsx = jsx.replace(/<a href="([^"]*)"/g, '<Link to="/event-types"');
jsx = jsx.replace(/<\/a>/g, '</Link>');

const reactComponent = 
"import React from 'react';\n" +
"import { Link } from 'react-router-dom';\n" +
"import './LandingPage.css';\n" +
"\n" +
"export default function LandingPage() {\n" +
"  return (\n" +
"    <div id=\"cal-landing\">\n" +
"      " + jsx.split('\n').join('\n      ') + "\n" +
"    </div>\n" +
"  );\n" +
"}\n";

fs.writeFileSync('c:/Users/Toshan/OneDrive/Desktop/clone/client/src/pages/LandingPage.jsx', reactComponent);
console.log('JSX conversion complete.');
