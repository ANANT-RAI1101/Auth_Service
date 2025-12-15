const nodemailer = require('nodemailer');

const transport=nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }

});

async function sendVerificationEmail(email, token) {
  const link =
    `http://localhost:3001/api/v1/verify-email?token=${token}`;

  await transport.sendMail({
    from: `"Auth Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `
      <h3>Email Verification</h3>
      <p>Click the link below:</p>
      <a href="${link}">Verify Email</a>
    `
  });
}

module.exports = {
  sendVerificationEmail
};