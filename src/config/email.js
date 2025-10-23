import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });


// Verify transporter configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ SMTP Connection failed:", error);
  } else {
    console.log("✅ SMTP Server is ready to take our messages");
  }
});

export default transporter;