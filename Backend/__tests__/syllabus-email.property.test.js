const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const supertest = require('supertest');
const fc = require('fast-check');
const jwt = require('jsonwebtoken');
const { sendSyllabusEmail } = require('../services/emailService');

// Mock sendSyllabusEmail from emailService
jest.mock('../services/emailService', () => {
    const original = jest.requireActual('../services/emailService');
    return {
        ...original,
        sendSyllabusEmail: jest.fn().mockResolvedValue({ success: true })
    };
});

process.env.JWT_SECRET = 'test-jwt-secret-for-leads';
process.env.JWT_EXPIRE = '1h';
process.env.NODE_ENV = 'test';

let mongoServer;
let app;
let request;
let authToken;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.MONGODB_URI = uri;

    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    await mongoose.connect(uri);

    app = require('../server');
    request = supertest(app);

    // Create a test admin user and generate a JWT token for authenticated endpoints
    const User = require('../models/User');
    const testUser = await User.create({
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
    });
    authToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Switch to 'development' so the rate limiter skip function passes
    // (the skip function checks NODE_ENV at request time, not at init time)
    process.env.NODE_ENV = 'development';
}, 30000);

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
}, 15000);

afterEach(async () => {
    const Lead = require('../models/Lead');
    await Lead.deleteMany({});
    sendSyllabusEmail.mockClear();
});

// Helper: generate a unique counter to avoid duplicate email/phone conflicts
let counter = 0;
function nextId() {
    return ++counter;
}

// Arbitrary for generating random valid lead data with unique email/phone
const validLeadArb = fc.record({
    name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    phone: fc.stringMatching(/^[1-9]\d{6,14}$/)
}).map(({ name, phone }) => {
    const id = nextId();
    return {
        name: name.trim(),
        email: `test${id}@example.com`,
        phone: `${phone}${id}`
    };
});

// Feature: syllabus-email-on-lead, Property 1: syllabusRequested persistence
// **Validates: Requirements 1.1**
describe('Property 1: syllabusRequested persistence', () => {
    it('For any valid lead with syllabusRequested: true, the persisted document has syllabusRequested === true', async () => {
        await fc.assert(
            fc.asyncProperty(validLeadArb, async (lead) => {
                const res = await request
                    .post('/api/leads')
                    .send({ ...lead, syllabusRequested: true });

                expect(res.status).toBe(201);
                expect(res.body.data.lead.syllabusRequested).toBe(true);

                // Also verify directly in DB
                const Lead = require('../models/Lead');
                const dbLead = await Lead.findById(res.body.data.lead._id);
                expect(dbLead.syllabusRequested).toBe(true);

                // Cleanup to avoid duplicate conflicts
                await Lead.deleteOne({ _id: dbLead._id });
            }),
            { numRuns: 100 }
        );
    });
});

// Feature: syllabus-email-on-lead, Property 2: syllabusRequested defaults to false
// **Validates: Requirements 1.2, 5.1**
describe('Property 2: syllabusRequested defaults to false', () => {
    it('For any valid lead omitting syllabusRequested, the persisted document has syllabusRequested === false', async () => {
        await fc.assert(
            fc.asyncProperty(validLeadArb, async (lead) => {
                // Send without syllabusRequested field
                const res = await request
                    .post('/api/leads')
                    .send(lead);

                expect(res.status).toBe(201);
                expect(res.body.data.lead.syllabusRequested).toBe(false);

                // Also verify directly in DB
                const Lead = require('../models/Lead');
                const dbLead = await Lead.findById(res.body.data.lead._id);
                expect(dbLead.syllabusRequested).toBe(false);

                // Cleanup to avoid duplicate conflicts
                await Lead.deleteOne({ _id: dbLead._id });
            }),
            { numRuns: 100 }
        );
    });
});

// Feature: syllabus-email-on-lead, Property 3: Validation unchanged by syllabusRequested
// **Validates: Requirements 1.3**
describe('Property 3: Validation unchanged by syllabusRequested', () => {
    it('For any lead missing required fields, verify 400 response regardless of syllabusRequested value', async () => {
        // Arbitrary that generates a lead with at least one required field missing
        const invalidLeadArb = fc.record({
            name: fc.oneof(
                fc.constant(undefined),
                fc.constant(''),
                fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0)
            ),
            email: fc.oneof(
                fc.constant(undefined),
                fc.constant(''),
                fc.constant('not-an-email'),
                fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0).map(s => `${s}@example.com`)
            ),
            phone: fc.oneof(
                fc.constant(undefined),
                fc.constant(''),
                fc.stringMatching(/^[1-9]\d{6,14}$/)
            ),
            syllabusRequested: fc.boolean()
        }).filter(({ name, email, phone }) => {
            // At least one required field must be missing or invalid
            const nameValid = name !== undefined && name.trim().length > 0;
            const emailValid = email !== undefined && email.trim().length > 0 && email.includes('@') && email !== 'not-an-email';
            const phoneValid = phone !== undefined && phone.trim().length > 0;
            return !(nameValid && emailValid && phoneValid);
        });

        await fc.assert(
            fc.asyncProperty(invalidLeadArb, async ({ name, email, phone, syllabusRequested }) => {
                const body = { syllabusRequested };
                if (name !== undefined) body.name = name;
                if (email !== undefined) body.email = email;
                if (phone !== undefined) body.phone = phone;

                const res = await request
                    .post('/api/leads')
                    .send(body);

                expect(res.status).toBe(400);
                expect(res.body.status).toBe('error');
            }),
            { numRuns: 100 }
        );
    });
});

// Feature: syllabus-email-on-lead, Property 4: Email triggered on syllabusRequested
// **Validates: Requirements 2.1**
describe('Property 4: Email triggered on syllabusRequested', () => {
    it('For any successfully created lead with syllabusRequested: true, sendSyllabusEmail is invoked with the lead email and name', async () => {
        await fc.assert(
            fc.asyncProperty(validLeadArb, async (lead) => {
                sendSyllabusEmail.mockClear();

                const res = await request
                    .post('/api/leads')
                    .send({ ...lead, syllabusRequested: true });

                expect(res.status).toBe(201);

                expect(sendSyllabusEmail).toHaveBeenCalledTimes(1);
                expect(sendSyllabusEmail).toHaveBeenCalledWith(
                    expect.objectContaining({
                        email: lead.email.toLowerCase(),
                        name: lead.name
                    })
                );

                // Cleanup to avoid duplicate conflicts
                const Lead = require('../models/Lead');
                await Lead.deleteOne({ _id: res.body.data.lead._id });
            }),
            { numRuns: 100 }
        );
    });
});

// Feature: syllabus-email-on-lead, Property 6: Email failure resilience
// **Validates: Requirements 3.1, 3.2**
describe('Property 6: Email failure resilience', () => {
    it('For any SMTP failure, the lead-creation endpoint still returns 201 and sendSyllabusEmail was called', async () => {
        const smtpErrorArb = fc.oneof(
            fc.constant('ECONNREFUSED'),
            fc.constant('ETIMEDOUT'),
            fc.constant('EAUTH'),
            fc.constant('ESOCKET'),
            fc.constant('EENVELOPE'),
            fc.constant('EMESSAGE'),
            fc.constant('Connection timeout'),
            fc.constant('Invalid login'),
            fc.constant('Message rejected'),
            fc.string({ minLength: 1, maxLength: 80 }).filter(s => s.trim().length > 0)
        );

        await fc.assert(
            fc.asyncProperty(validLeadArb, smtpErrorArb, async (lead, errorMsg) => {
                sendSyllabusEmail.mockClear();
                // The real sendSyllabusEmail wraps everything in try/catch and always
                // resolves (never rejects). Simulate an SMTP failure by resolving with
                // { success: false, error } — exactly what the real implementation does.
                sendSyllabusEmail.mockResolvedValueOnce({ success: false, error: errorMsg });

                const res = await request
                    .post('/api/leads')
                    .send({ ...lead, syllabusRequested: true });

                // Lead creation must still succeed with 201
                expect(res.status).toBe(201);
                expect(res.body.status).toBe('success');
                expect(res.body.data.lead).toBeDefined();
                expect(res.body.data.lead.name).toBe(lead.name);
                expect(res.body.data.lead.email).toBe(lead.email.toLowerCase());
                expect(res.body.data.lead.syllabusRequested).toBe(true);

                // sendSyllabusEmail must have been called despite the failure
                expect(sendSyllabusEmail).toHaveBeenCalledTimes(1);
                expect(sendSyllabusEmail).toHaveBeenCalledWith(
                    expect.objectContaining({
                        email: lead.email.toLowerCase(),
                        name: lead.name
                    })
                );

                // Cleanup
                const Lead = require('../models/Lead');
                await Lead.deleteOne({ _id: res.body.data.lead._id });
            }),
            { numRuns: 100 }
        );
    });
});

// Feature: syllabus-email-on-lead, Property 7: Async email delivery
// **Validates: Requirements 3.3**
describe('Property 7: Async email delivery', () => {
    it('For any lead with syllabusRequested: true, the HTTP response returns before the email promise resolves', async () => {
        await fc.assert(
            fc.asyncProperty(validLeadArb, async (lead) => {
                sendSyllabusEmail.mockClear();

                // Create a deferred promise — the email will stay pending until we resolve it
                let resolveEmail;
                const emailPromise = new Promise((resolve) => {
                    resolveEmail = resolve;
                });
                sendSyllabusEmail.mockReturnValueOnce(emailPromise);

                // Track whether the email has resolved
                let emailResolved = false;
                emailPromise.then(() => { emailResolved = true; });

                // Make the HTTP request — this should return BEFORE the email resolves
                const res = await request
                    .post('/api/leads')
                    .send({ ...lead, syllabusRequested: true });

                // The response came back; the email promise should still be pending
                expect(res.status).toBe(201);
                expect(emailResolved).toBe(false);

                // Now resolve the deferred promise to clean up
                resolveEmail({ success: true });
                await emailPromise;

                // Cleanup lead to avoid duplicate conflicts
                const Lead = require('../models/Lead');
                await Lead.deleteOne({ _id: res.body.data.lead._id });
            }),
            { numRuns: 100 }
        );
    });
});

// Feature: syllabus-email-on-lead, Property 8: Admin response includes syllabusRequested
// **Validates: Requirements 5.2**
describe('Property 8: Admin response includes syllabusRequested', () => {
    it('For any leads with random syllabusRequested values, the admin GET endpoint returns the field with the correct stored value', async () => {
        await fc.assert(
            fc.asyncProperty(validLeadArb, fc.boolean(), async (lead, syllabusValue) => {
                // Create a lead with a random syllabusRequested value
                const createRes = await request
                    .post('/api/leads')
                    .send({ ...lead, syllabusRequested: syllabusValue });

                expect(createRes.status).toBe(201);
                const createdLeadId = createRes.body.data.lead._id;

                // Fetch via admin endpoint with auth token
                const adminRes = await request
                    .get('/api/leads/admin/all')
                    .set('Authorization', `Bearer ${authToken}`);

                expect(adminRes.status).toBe(200);
                expect(adminRes.body.status).toBe('success');

                // Find the created lead in the admin response
                const returnedLead = adminRes.body.data.leads.find(l => l._id === createdLeadId);
                expect(returnedLead).toBeDefined();
                expect(returnedLead.syllabusRequested).toBe(syllabusValue);

                // Cleanup
                const Lead = require('../models/Lead');
                await Lead.deleteOne({ _id: createdLeadId });
            }),
            { numRuns: 100 }
        );
    });
});
