import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p className="update-date">Last updated: October 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>Cardinal Inks Publishing</strong>. Your privacy is
            very important to us. This Privacy Policy explains how we collect,
            use, and protect your personal information when you interact with our
            website, services, or digital platforms.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Personal information such as name, email address, and contact details.</li>
            <li>Account information when you register or make a purchase.</li>
            <li>Usage data such as IP address, browser type, and browsing history.</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>Your information helps us to:</p>
          <ul>
            <li>Provide and improve our publishing services.</li>
            <li>Process your orders and manage your account.</li>
            <li>Communicate updates, offers, and newsletters (with your consent).</li>
            <li>Analyze usage trends and website performance.</li>
          </ul>
        </section>

        <section>
          <h2>4. Information Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information. However, we may
            share your data with trusted service providers who assist in our operations,
            such as payment processors or email services, under strict confidentiality
            agreements.
          </p>
        </section>

        <section>
          <h2>5. Data Protection</h2>
          <p>
            We use appropriate security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
            However, please note that no online transmission is completely secure.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request corrections or deletion of your information.</li>
            <li>Withdraw consent for communications at any time.</li>
          </ul>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Our website uses cookies to improve your browsing experience. You can
            control or delete cookies from your browser settings at any time.
          </p>
        </section>

        <section>
          <h2>8. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. The “Last updated” date at
            the top will reflect the latest revision. Please review this page regularly
            to stay informed.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            For any questions or concerns regarding this Privacy Policy, please contact
            us at:
          </p>
          <p className="contact">
            <strong>Email:</strong> support@cardinalinks.com <br />
            <strong>Address:</strong> Cardinal Inks Publishing HQ, Port Harcourt, Nigeria
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
