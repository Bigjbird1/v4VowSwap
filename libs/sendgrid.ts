import sgMail from "@sendgrid/mail";

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_KEY!);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Send an email using SendGrid
 * @param {EmailParams} params - Email parameters
 * @returns {Promise<void>}
 */
export async function sendEmail({
  to,
  from,
  subject,
  text,
  html,
}: EmailParams): Promise<void> {
  try {
    const msg = {
      to,
      from,
      subject,
      text,
      html: html || text, // Fallback to text if html isn't provided
    };

    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    // Type guard to handle error as an object with a possible response property
    if (error instanceof Error && (error as any).response?.body) {
      console.error("Error sending email:", (error as any).response.body);
    } else {
      console.error("Error sending email:", error);
    }
    throw new Error("Failed to send email");
  }
}

/**
 * Example usage of sendEmail (Uncomment to use):
 *
 * sendEmail({
 *   to: "recipient@example.com",
 *   from: "your-email@example.com",
 *   subject: "Test Email",
 *   text: "This is a test email!",
 * })
 *   .then(() => {
 *     console.log("Email sent!");
 *   })
 *   .catch((error) => {
 *     console.error("Failed to send email", error);
 *   });
 */
