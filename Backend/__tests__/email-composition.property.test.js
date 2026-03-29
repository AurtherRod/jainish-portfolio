const fc = require('fast-check');

// Mock nodemailer at the module level — capture mail options passed to sendMail
const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-id' });
jest.mock('nodemailer', () => ({
    createTransport: jest.fn(() => ({
        sendMail: mockSendMail
    }))
}));

// Set SMTP env vars so isConfigured() returns true
process.env.HOSTINGER_SMTP_HOST = 'smtp.test.com';
process.env.HOSTINGER_SMTP_PORT = '465';
process.env.HOSTINGER_EMAIL = 'test@test.com';
process.env.HOSTINGER_EMAIL_PASS = 'testpass';

// Require the ACTUAL sendSyllabusEmail (nodemailer is already mocked above)
const { sendSyllabusEmail } = require('../services/emailService');

afterEach(() => {
    mockSendMail.mockClear();
});

// Feature: syllabus-email-on-lead, Property 5: Email composition correctness
// **Validates: Requirements 2.2, 2.4**
describe('Property 5: Email composition correctness', () => {
    it('For any lead, the email contains the syllabus PDF attachment and the body contains the lead name', async () => {
        const leadArb = fc.record({
            name: fc.string({ minLength: 1, maxLength: 60 }).filter(s => s.trim().length > 0).map(s => s.trim()),
            email: fc.emailAddress()
        });

        await fc.assert(
            fc.asyncProperty(leadArb, async (lead) => {
                mockSendMail.mockClear();

                const result = await sendSyllabusEmail(lead);

                expect(result.success).toBe(true);
                expect(mockSendMail).toHaveBeenCalledTimes(1);

                const mailOptions = mockSendMail.mock.calls[0][0];

                // Verify attachment with correct filename
                expect(mailOptions.attachments).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            filename: '12-Month Game Development Syllabus.pdf'
                        })
                    ])
                );

                // Verify the HTML body contains the lead's name
                expect(mailOptions.html).toContain(lead.name);
            }),
            { numRuns: 100 }
        );
    });
});
