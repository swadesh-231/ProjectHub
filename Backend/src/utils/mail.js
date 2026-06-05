import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Camp",
      link: "https://projectcamp.com",
    },
  });

  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // Generic SMTP config (Gmail, Resend, etc.). Falls back to the old
  // MAILTRAP_* vars so existing setups keep working.
  const host = process.env.SMTP_HOST || process.env.MAILTRAP_SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.MAILTRAP_SMTP_PORT);
  const user = process.env.SMTP_USER || process.env.MAILTRAP_SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.MAILTRAP_SMTP_PASS;

  const transporter = nodemailer.createTransport({
    host,
    port,
    // secure must be true for port 465 (Gmail), false for 587/2525 (STARTTLS).
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    auth: { user, pass },
  });

  const mail = {
    from: process.env.MAIL_FROM || user || "mail@projectcamp.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    // Don't crash the request flow if email fails (e.g. missing SMTP creds in dev).
    console.error("Email service failed. Make sure SMTP credentials are set.");
    console.error("Error: ", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Project Camp! We're excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, otp) => {
  return {
    body: {
      name: username,
      intro: [
        "We got a request to reset the password of your account.",
        `Your one-time password reset code is: ${otp}`,
        "Enter this code on the reset page. It expires in 10 minutes.",
      ],
      outro:
        "If you didn't request this, you can safely ignore this email — your password won't be changed.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
