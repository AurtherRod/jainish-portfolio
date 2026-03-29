const nodemailer = require('nodemailer');
const path = require('path');

const REQUIRED_ENV_VARS = [
    'HOSTINGER_SMTP_HOST',
    'HOSTINGER_SMTP_PORT',
    'HOSTINGER_EMAIL',
    'HOSTINGER_EMAIL_PASS'
];

/**
 * Checks all four SMTP env vars are present.
 * Logs a warning if any are missing.
 * @returns {boolean}
 */
function isConfigured() {
    const missing = REQUIRED_ENV_VARS.filter((v) => !process.env[v]);
    if (missing.length > 0) {
        console.warn(
            `[EmailService] Missing SMTP environment variables: ${missing.join(', ')}. Email sending will be skipped.`
        );
        return false;
    }
    return true;
}

/**
 * Creates and returns a Nodemailer transporter using Hostinger SMTP settings.
 * @returns {nodemailer.Transporter}
 */
function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.HOSTINGER_SMTP_HOST,
        port: Number(process.env.HOSTINGER_SMTP_PORT),
        secure: Number(process.env.HOSTINGER_SMTP_PORT) === 465,
        auth: {
            user: process.env.HOSTINGER_EMAIL,
            pass: process.env.HOSTINGER_EMAIL_PASS
        }
    });
}

/**
 * Sends the syllabus PDF email to a lead.
 * Always resolves — never rejects.
 * @param {{ name: string, email: string }} lead
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
async function sendSyllabusEmail(lead) {
    try {
        if (!isConfigured()) {
            console.log(`[EmailService] Skipping email for lead ${lead.email} — SMTP not configured.`);
            return { success: false };
        }

        const transporter = createTransporter();
        const attachmentPath = path.join(__dirname, '..', '12-Month Game Development Syllabus.pdf');

        const mailOptions = {
            from: `"Jainish Gupta" <${process.env.HOSTINGER_EMAIL}>`,
            to: lead.email,
            subject: 'Here is your 12-Month Game Development Syllabus',
            html: `<p>Hi ${lead.name},</p>
<p>Thank you for your interest! Please find attached the <strong>12-Month Game Development Syllabus</strong> you requested.</p>
<p>Feel free to reach out if you have any questions.</p>
<p>Best regards,<br/>Jainish Gupta</p>`,
            attachments: [
                {
                    filename: '12-Month Game Development Syllabus.pdf',
                    path: attachmentPath
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Syllabus email sent to ${lead.email}`);
        return { success: true };
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`[EmailService] PDF not found at path: ${path.join(__dirname, '..', '12-Month Game Development Syllabus.pdf')}`);
        } else {
            console.error(`[EmailService] Failed to send email to lead ${lead.name} (${lead.email}):`, error.message);
        }
        return { success: false, error: error.message };
    }
}

module.exports = { isConfigured, createTransporter, sendSyllabusEmail };
