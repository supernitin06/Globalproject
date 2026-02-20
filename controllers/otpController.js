const EmailVerification = require("../models/EmailVerification");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  try {
    await EmailVerification.deleteMany({ email }); // Clear old OTPs
    await EmailVerification.create({ email, otp, expiresAt });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `GlobalProjects <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `<p>Your OTP for verifying email is: <strong>${otp}</strong>. It is valid for 5 minutes.</p>`
    });

    res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await EmailVerification.findOne({ email, otp });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
    await EmailVerification.deleteMany({ email });
    res.status(200).json({ success: true, verified: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};