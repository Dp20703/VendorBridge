import transporter from "../../config/nodemailer.config.js";

export const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"VendorBridge" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
