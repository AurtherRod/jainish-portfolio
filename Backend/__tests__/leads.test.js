const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test-jwt-secret-for-leads';
process.env.JWT_EXPIRE = '1h';
process.env.NODE_ENV = 'test';

let mongoServer;
let app;
let request;
let authToken;
let testUser;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Set MONGODB_URI before importing app so server.js connects to in-memory DB
    process.env.MONGODB_URI = uri;

    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    await mongoose.connect(uri);

    // Now require the app after mongoose is connected and env is set
    app = require('../server');
    request = supertest(app);

    const User = require('../models/User');
    testUser = await User.create({
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123'
    });
    authToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
});

const validLead = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-1234'
};

// ─── Requirement 1.1, 1.2: Public POST /api/leads ───

describe('POST /api/leads', () => {
    it('should create a lead with valid data and return 201 with source=external', async () => {
        const res = await request.post('/api/leads').send(validLead);

        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.lead.name).toBe('Jane Doe');
        expect(res.body.data.lead.email).toBe('jane@example.com');
        expect(res.body.data.lead.phone).toBe('555-1234');
        expect(res.body.data.lead.source).toBe('external');
        expect(res.body.data.lead.status).toBe('new');
    });

    it('should return 400 when name is missing', async () => {
        const res = await request.post('/api/leads').send({
            email: 'jane@example.com',
            phone: '555-1234'
        });

        expect(res.status).toBe(400);
        expect(res.body.status).toBe('error');
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors.length).toBeGreaterThan(0);
    });

    it('should return 400 when email is invalid', async () => {
        const res = await request.post('/api/leads').send({
            name: 'Jane Doe',
            email: 'not-an-email',
            phone: '555-1234'
        });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    it('should return 400 when phone is missing', async () => {
        const res = await request.post('/api/leads').send({
            name: 'Jane Doe',
            email: 'jane@example.com'
        });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    it('should return 400 when all fields are missing', async () => {
        const res = await request.post('/api/leads').send({});

        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBeGreaterThanOrEqual(3);
    });
});

// ─── Requirement 1.4: Source detection (JWT presence) ───

describe('POST /api/leads — source detection', () => {
    it('should set source to admin-dashboard when valid JWT is provided', async () => {
        const res = await request
            .post('/api/leads')
            .set('Authorization', `Bearer ${authToken}`)
            .send(validLead);

        expect(res.status).toBe(201);
        expect(res.body.data.lead.source).toBe('admin-dashboard');
    });

    it('should set source to external when invalid JWT is provided', async () => {
        const res = await request
            .post('/api/leads')
            .set('Authorization', 'Bearer invalid-token-here')
            .send(validLead);

        expect(res.status).toBe(201);
        expect(res.body.data.lead.source).toBe('external');
    });

    it('should set source to external when no Authorization header is present', async () => {
        const res = await request.post('/api/leads').send(validLead);

        expect(res.status).toBe(201);
        expect(res.body.data.lead.source).toBe('external');
    });
});

// ─── Requirement 3.3, 4.4, 5.3, 6.3: Admin endpoints return 401 without auth ───

describe('Admin endpoints — authentication required', () => {
    it('GET /api/leads/admin/all should return 401 without auth', async () => {
        const res = await request.get('/api/leads/admin/all');
        expect(res.status).toBe(401);
    });

    it('GET /api/leads/admin/stats should return 401 without auth', async () => {
        const res = await request.get('/api/leads/admin/stats');
        expect(res.status).toBe(401);
    });

    it('PUT /api/leads/:id/status should return 401 without auth', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request
            .put(`/api/leads/${fakeId}/status`)
            .send({ status: 'contacted' });
        expect(res.status).toBe(401);
    });

    it('DELETE /api/leads/:id should return 401 without auth', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request.delete(`/api/leads/${fakeId}`);
        expect(res.status).toBe(401);
    });
});

// ─── Requirement 3.3: GET /api/leads/admin/all ───

describe('GET /api/leads/admin/all', () => {
    it('should return leads sorted by createdAt descending', async () => {
        const Lead = require('../models/Lead');
        await Lead.create({ name: 'First', email: 'first@test.com', phone: '111', createdAt: new Date('2024-01-01') });
        await Lead.create({ name: 'Second', email: 'second@test.com', phone: '222', createdAt: new Date('2024-06-01') });
        await Lead.create({ name: 'Third', email: 'third@test.com', phone: '333', createdAt: new Date('2024-12-01') });

        const res = await request
            .get('/api/leads/admin/all')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.leads).toHaveLength(3);
        expect(res.body.data.count).toBe(3);
        expect(res.body.data.leads[0].name).toBe('Third');
        expect(res.body.data.leads[2].name).toBe('First');
    });

    it('should filter leads by status query param', async () => {
        const Lead = require('../models/Lead');
        await Lead.create({ name: 'New Lead', email: 'new@test.com', phone: '111', status: 'new' });
        await Lead.create({ name: 'Contacted Lead', email: 'contacted@test.com', phone: '222', status: 'contacted' });
        await Lead.create({ name: 'Another New', email: 'new2@test.com', phone: '333', status: 'new' });

        const res = await request
            .get('/api/leads/admin/all?status=new')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.data.leads).toHaveLength(2);
        res.body.data.leads.forEach(lead => {
            expect(lead.status).toBe('new');
        });
    });

    it('should return empty array when no leads exist', async () => {
        const res = await request
            .get('/api/leads/admin/all')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.data.leads).toHaveLength(0);
        expect(res.body.data.count).toBe(0);
    });
});

// ─── Requirement 6.3: GET /api/leads/admin/stats ───

describe('GET /api/leads/admin/stats', () => {
    it('should return correct counts per status', async () => {
        const Lead = require('../models/Lead');
        await Lead.create({ name: 'A', email: 'a@test.com', phone: '1', status: 'new' });
        await Lead.create({ name: 'B', email: 'b@test.com', phone: '2', status: 'new' });
        await Lead.create({ name: 'C', email: 'c@test.com', phone: '3', status: 'contacted' });
        await Lead.create({ name: 'D', email: 'd@test.com', phone: '4', status: 'qualified' });

        const res = await request
            .get('/api/leads/admin/stats')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.data.stats.new).toBe(2);
        expect(res.body.data.stats.contacted).toBe(1);
        expect(res.body.data.stats.qualified).toBe(1);
        expect(res.body.data.stats.closed).toBe(0);
        expect(res.body.data.stats.total).toBe(4);
    });

    it('should return all zeros when no leads exist', async () => {
        const res = await request
            .get('/api/leads/admin/stats')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.data.stats.total).toBe(0);
    });
});

// ─── Requirement 4.3: PUT /api/leads/:id/status ───

describe('PUT /api/leads/:id/status', () => {
    it('should update lead status and return 200', async () => {
        const Lead = require('../models/Lead');
        const lead = await Lead.create({ name: 'Test', email: 'test@test.com', phone: '123', status: 'new' });

        const res = await request
            .put(`/api/leads/${lead._id}/status`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ status: 'contacted' });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.lead.status).toBe('contacted');
    });

    it('should update lead note along with status', async () => {
        const Lead = require('../models/Lead');
        const lead = await Lead.create({ name: 'Test', email: 'test@test.com', phone: '123', status: 'new' });

        const res = await request
            .put(`/api/leads/${lead._id}/status`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ status: 'contacted', note: 'Called on Monday' });

        expect(res.status).toBe(200);
        expect(res.body.data.lead.note).toBe('Called on Monday');
    });

    it('should return 404 for non-existent lead ID', async () => {
        const fakeId = new mongoose.Types.ObjectId();

        const res = await request
            .put(`/api/leads/${fakeId}/status`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ status: 'contacted' });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Lead not found');
    });
});

// ─── Requirement 5.2: DELETE /api/leads/:id ───

describe('DELETE /api/leads/:id', () => {
    it('should delete a lead and return 200', async () => {
        const Lead = require('../models/Lead');
        const lead = await Lead.create({ name: 'ToDelete', email: 'del@test.com', phone: '999' });

        const res = await request
            .delete(`/api/leads/${lead._id}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');

        // Verify it's actually gone from DB
        const found = await Lead.findById(lead._id);
        expect(found).toBeNull();
    });

    it('should return 404 for non-existent lead ID', async () => {
        const fakeId = new mongoose.Types.ObjectId();

        const res = await request
            .delete(`/api/leads/${fakeId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Lead not found');
    });
});
