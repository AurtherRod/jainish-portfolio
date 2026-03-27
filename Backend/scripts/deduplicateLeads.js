/**
 * One-time migration script to remove duplicate leads before unique indexes are enforced.
 * Keeps the OLDEST lead for each email/phone, deletes newer duplicates.
 * 
 * Usage: node scripts/deduplicateLeads.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('../models/Lead');

async function deduplicateLeads() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // --- Deduplicate by email ---
        const emailDupes = await Lead.aggregate([
            { $group: { _id: '$email', count: { $sum: 1 }, ids: { $push: '$_id' }, dates: { $push: '$createdAt' } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        let emailDeleteCount = 0;
        for (const group of emailDupes) {
            // Sort ids by creation date, keep the oldest
            const sorted = group.ids
                .map((id, i) => ({ id, date: group.dates[i] }))
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            const toDelete = sorted.slice(1).map(item => item.id);
            await Lead.deleteMany({ _id: { $in: toDelete } });
            emailDeleteCount += toDelete.length;
            console.log(`Email "${group._id}": kept oldest, removed ${toDelete.length} duplicate(s)`);
        }

        // --- Deduplicate by phone ---
        const phoneDupes = await Lead.aggregate([
            { $group: { _id: '$phone', count: { $sum: 1 }, ids: { $push: '$_id' }, dates: { $push: '$createdAt' } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        let phoneDeleteCount = 0;
        for (const group of phoneDupes) {
            const sorted = group.ids
                .map((id, i) => ({ id, date: group.dates[i] }))
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            const toDelete = sorted.slice(1).map(item => item.id);
            await Lead.deleteMany({ _id: { $in: toDelete } });
            phoneDeleteCount += toDelete.length;
            console.log(`Phone "${group._id}": kept oldest, removed ${toDelete.length} duplicate(s)`);
        }

        console.log(`\nDone. Removed ${emailDeleteCount} email duplicates, ${phoneDeleteCount} phone duplicates.`);

        // --- Now normalize all phone numbers ---
        const allLeads = await Lead.find({});
        let normalizedCount = 0;
        for (const lead of allLeads) {
            const normalized = lead.phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
            if (normalized !== lead.phone) {
                lead.phone = normalized;
                await lead.save();
                normalizedCount++;
            }
        }
        console.log(`Normalized ${normalizedCount} phone numbers.`);

    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

deduplicateLeads();
