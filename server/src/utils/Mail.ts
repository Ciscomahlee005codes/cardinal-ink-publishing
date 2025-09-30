const nodemailer = require("nodemailer");

function mailer(
  name: string,
  email: string,
  subject: string,
  message: string
): void {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Cardinal ink",
    to: email,
    subject: subject,
    html: `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Your verification code</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; display:block; }
    a { color: inherit; text-decoration: none; }
    body {
      width:100% !important;
      height:100% !important;
      margin:0;
      padding:0;
      background-color:#f4f6f8;
      font-family: "Helvetica Neue", Arial, sans-serif;
    }
    .email-wrapper {
      width:100%;
      max-width:680px;
      margin:24px auto;
    }
    .email-card {
      background:#ffffff;
      border-radius:10px;
      overflow:hidden;
      box-shadow: 0 6px 18px rgba(14,30,37,0.08);
      border: 1px solid rgba(0,0,0,0.03);
    }
    .email-header {
      background: linear-gradient(90deg,#00bf63,#00a855);
      color: #ffffff;
      padding: 22px 28px;
      text-align:left;
      display:flex;
      align-items:center;
      gap:12px;
    }
    .logo {
      width:56px;
      height:56px;
      border-radius:8px;
      overflow:hidden;
      background:#fff;
      display:inline-block;
    }
    .logo img { width:100%; height:100%; object-fit:contain; display:block; }
    .brand-title {
      font-size:18px;
      font-weight:700;
      line-height:1;
    }
    .brand-sub {
      font-size:12px;
      opacity:0.95;
      margin-top:3px;
    }
    .email-body {
      padding:28px;
      color:#233;
    }
    .greeting {
      font-size:18px;
      font-weight:600;
      margin-bottom:6px;
      color:#111;
    }
    .lead {
      font-size:14px;
      color:#444;
      line-height:1.6;
      margin-bottom:18px;
    }
    .otp-box {
      background:#f7f9fb;
      padding:18px;
      border-radius:8px;
      text-align:center;
      margin: 18px 0;
      border:1px dashed rgba(0,0,0,0.06);
    }
    .otp-code {
      display:inline-block;
      font-family: "Courier New", Courier, monospace;
      font-size:28px;
      letter-spacing:6px;
      font-weight:700;
      color:#0b7a3f;
      padding:8px 14px;
      background:#ffffff;
      border-radius:6px;
      box-shadow: 0 4px 10px rgba(11,122,63,0.06);
    }
    .otp-note {
      font-size:12px;
      color:#666;
      margin-top:10px;
    }
    .btn {
      display:inline-block;
      background:#00bf63;
      color:#fff;
      padding:12px 20px;
      border-radius:8px;
      font-weight:700;
      margin-top:14px;
    }
    .muted {
      color:#777;
      font-size:13px;
      margin-top:12px;
      line-height:1.5;
    }
    .email-footer {
      padding:18px 28px;
      font-size:12px;
      color:#808080;
      background:#fafafa;
      text-align:center;
    }

    .content {
      padding: 28px;
      text-align: center;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      margin-bottom: 15px;
      color: #00a855;
    }
    .content p {
      font-size: 15px;
      margin: 10px 0;
      line-height: 1.6;
      color: #444;
    }
      
    .footer-links a { color:#00a855; text-decoration:none; margin:0 6px; font-weight:600; }
    @media only screen and (max-width:480px) {
      .email-body { padding:20px; }
      .email-header { padding:16px; gap:10px; }
      .brand-title { font-size:16px; }
      .otp-code { font-size:22px; letter-spacing:4px; padding:6px 10px; }
      .logo { width:48px; height:48px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-card" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <!-- Header -->
            <tr>
              <td>
                <div class="email-header" style="padding:22px 28px;">
                  <div class="logo">
                    <!-- Replace with your logo URL -->
                    <img src="{{LOGO_URL}}" alt="Logo" />
                  </div>
                  <div>
                    <div class="brand-title">Cardinal Ink Publishing</div>
                    <div class="brand-sub">Your digital library of great reads</div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td>
                <div class="email-body">
                  <div class="greeting">Hi ${name}</div>
                 ${message} 
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td>
                <div class="email-footer">
                  <div style="margin-bottom:8px;">
                    Need help? Email 
                    <a href="mailto:support@elibrary.com" style="color:#00a855;">support@elibrary.com</a>
                  </div>
                  <div class="footer-links">
                    <a href="{{UNSUBSCRIBE_LINK}}">Unsubscribe</a> •
                    <a href="{{PRIVACY_LINK}}">Privacy</a> •
                    <span style="color:#999;">© ${new Date().getFullYear()} E-Library</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
      return false;
    } else {
      return false;
    }
  });
}

module.exports = mailer;
