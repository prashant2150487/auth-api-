import transporter from "../config/email.js";

export const sendEmail = async (email, subject, template) => {
  try {

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: template,
    };
    

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    
    // Provide more specific error messages
    if (error.code === 'EAUTH') {
      console.error("🔐 Authentication failed. Please check your SMTP credentials.");
      throw new Error("Email authentication failed. Please check SMTP credentials.");
    } else if (error.code === 'ECONNECTION') {
      console.error("🌐 Connection failed. Please check your SMTP host and port.");
      throw new Error("Email connection failed. Please check SMTP settings.");
    } else {
      throw error;
    }
  }
};
