import transporter from "../config/mail.config.js";

const sendInvoiceEmail = async ({ to, invoiceNumber, totalAmount, pdfUrl }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `Invoice ${invoiceNumber}`,
    html: `
      <h2>Invoice Generated</h2>

      <p>
        Your invoice <strong>${invoiceNumber}</strong>
        has been generated successfully.
      </p>

      <p>
        Total Amount:
        <strong>₹${totalAmount}</strong>
      </p>

      <p>
        Download Invoice:
        <a href="${pdfUrl}">
          View Invoice
        </a>
      </p>
    `,
  });
};

export default sendInvoiceEmail;
