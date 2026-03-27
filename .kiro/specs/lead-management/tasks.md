# Implementation Plan: Lead Management

## Overview

Implement a lead capture and management system with a public API endpoint for external sites, protected admin endpoints, frontend API functions, and a LeadsPage in the admin dashboard. The implementation follows existing Express/Mongoose/React patterns in the codebase.

## Tasks

- [x] 1. Create Lead Mongoose model and backend routes
  - [x] 1.1 Create the Lead model at `Backend/models/Lead.js`
    - Define schema with name, email, phone, status, note, source, createdAt, updatedAt fields
    - Add validation rules matching existing model patterns (see Comment.js, User.js)
    - Add indexes on `status + createdAt` and `email`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 1.2 Create lead routes at `Backend/routes/leads.js`
    - Implement public `POST /api/leads` with express-validator validation for name, email, phone
    - Detect source based on JWT presence in Authorization header (`admin-dashboard` if valid JWT, `external` otherwise)
    - Implement protected `GET /api/leads/admin/all` with optional `?status=` filter, sorted by createdAt descending
    - Implement protected `GET /api/leads/admin/stats` returning counts per status and total
    - Implement protected `PUT /api/leads/:id/status` for updating status and optional note, refreshing updatedAt
    - Implement protected `DELETE /api/leads/:id` for removing a lead
    - Use `protect` middleware from `Backend/middleware/auth.js` on all admin routes
    - Return 404 for non-existent lead IDs on update/delete
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3_

  - [x] 1.3 Register lead routes and update CORS in `Backend/server.js`
    - Import and mount lead routes at `/api/leads`
    - Add `https://course.jainish.space` to the CORS `allowedOrigins` array
    - _Requirements: 9.1, 9.2_

  - [x] 1.4 Write unit tests for lead routes
    - Test public POST validation (400 on invalid data, 201 on valid data)
    - Test source detection (external vs admin-dashboard)
    - Test admin endpoints return 401 without auth
    - Test status update, deletion, stats, and 404 cases
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.3, 4.3, 4.4, 5.2, 5.3, 6.3_

- [x] 2. Checkpoint - Ensure backend compiles and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Add frontend API functions and LeadsPage
  - [x] 3.1 Add lead API functions to `src/services/api.js`
    - Add `createLead(leadData)` — POST /api/leads with auth headers (for admin "Add Lead")
    - Add `fetchAllLeads(params)` — GET /api/leads/admin/all with auth headers and cache buster
    - Add `fetchLeadStats()` — GET /api/leads/admin/stats with auth headers
    - Add `updateLeadStatus(id, data)` — PUT /api/leads/:id/status with auth headers
    - Add `deleteLead(id)` — DELETE /api/leads/:id with auth headers
    - Follow existing patterns (getAuthHeaders, handleResponse, cache busting)
    - _Requirements: 7.2, 8.3, 8.4, 8.5_

  - [x] 3.2 Create `src/pages/LeadsPage.jsx`
    - Fetch and display leads using `fetchAllLeads` on mount
    - Fetch and display lead stats using `fetchLeadStats` as status filter badges
    - Implement status filter controls (all, new, contacted, qualified, closed)
    - Display leads in a table/card layout showing name, email, phone, status, source, note, createdAt
    - Implement "Add Lead" button that opens an inline form with name, email, phone fields
    - Add client-side validation on the Add Lead form (non-empty name, valid email, non-empty phone)
    - On successful add, show success message and refresh lead list
    - Implement inline status update via dropdown per lead, calling `updateLeadStatus`
    - Implement note editing per lead
    - Implement delete with confirmation dialog, calling `deleteLead`
    - Display lead source badge (external vs admin-dashboard) for each lead
    - Wrap in `DashboardLayout`, use existing UI components (Card, Button, Badge)
    - Responsive layout matching existing dashboard pages (BlogListPage, CommentModerationPage)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.3, 8.4, 8.5, 8.6_

  - [x] 3.3 Write unit tests for LeadsPage component
    - Test lead list rendering
    - Test status filtering
    - Test Add Lead form validation and submission
    - Test status update and delete interactions
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.3, 8.4, 8.5_

- [x] 4. Integrate LeadsPage into dashboard navigation and routing
  - [x] 4.1 Add "Leads" navigation item to `src/components/DashboardLayout.jsx`
    - Add a new nav section or item under the "Engagement" section with path `/dashboard/leads`, label "Leads", and an appropriate icon
    - _Requirements: 8.1_

  - [x] 4.2 Add LeadsPage route to `src/App.jsx`
    - Lazy-import LeadsPage
    - Add route at `/dashboard/leads` wrapped in `ProtectedRoute` and `Suspense`, following existing dashboard route patterns
    - _Requirements: 8.2_

- [x] 5. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The design uses JavaScript throughout (Express/Mongoose backend, React/Tailwind frontend)
- All admin endpoints reuse the existing `protect` JWT middleware
- The public POST endpoint reuses the existing rate limiter
- CORS update is a single-line addition to the existing allowedOrigins array
