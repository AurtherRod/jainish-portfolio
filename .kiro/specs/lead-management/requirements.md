# Requirements Document

## Introduction

The Lead Management feature enables lead capture from two sources: (1) external websites (e.g., course.jainish.space) via a public API endpoint, and (2) the admin dashboard where the administrator can manually add leads. The admin dashboard provides a LeadsPage for viewing, filtering, updating status/notes, and deleting leads. The portfolio website (jainish.space) does NOT have any lead form or CTA — the ContactSection remains unchanged. The feature integrates into the existing Express/Mongoose backend and React/Tailwind frontend.

## Glossary

- **Lead_API_Public**: The Express route handler at `POST /api/leads` that accepts lead submissions without authentication, intended for external website integrations.
- **Lead_Model**: The Mongoose schema and model defining the structure, validation rules, and indexes for lead documents in MongoDB.
- **Admin_Lead_API**: The set of protected Express route handlers under `/api/leads/admin/*` and `/api/leads/:id/*` that serve lead data to the admin dashboard.
- **Leads_Page**: The admin dashboard page component that displays, filters, and manages leads, including an "Add Lead" form.
- **Lead_Status**: One of the four lifecycle values a lead can hold: `new`, `contacted`, `qualified`, `closed`.
- **Protect_Middleware**: The existing JWT-based authentication middleware that guards admin endpoints.
- **Lead_Source**: The origin of a lead: `external` for submissions via the public API (no auth), `admin-dashboard` for leads manually added by the admin.

## Requirements

### Requirement 1: Public Lead Submission API

**User Story:** As an external website owner, I want to submit leads to the portfolio backend via a public API endpoint, so that visitors on my external sites (e.g., course.jainish.space) can express interest without needing authentication.

#### Acceptance Criteria

1. WHEN an external site sends a POST request to `/api/leads` with a valid name, email, and phone, THE Lead_API_Public SHALL create a new lead document with status `new` and source `external` and return a 201 response.
2. WHEN the Lead_API_Public receives a request with an empty name OR invalid email OR empty phone, THE Lead_API_Public SHALL return a 400 response with an errors array and no lead document SHALL be created.
3. THE Lead_API_Public SHALL NOT require any authentication (no JWT, no API key) for lead submission.
4. WHEN a lead is submitted with a valid JWT in the Authorization header, THE Lead_API_Public SHALL set the source to `admin-dashboard` instead of `external`.
5. THE Lead_API_Public SHALL be rate-limited by the existing rate limiter to prevent abuse.

### Requirement 2: Lead Data Persistence

**User Story:** As a site owner, I want submitted leads to be stored reliably with validated data, so that I have accurate contact information for follow-up.

#### Acceptance Criteria

1. THE Lead_Model SHALL require a name field that is a non-empty trimmed string with a maximum length of 100 characters.
2. THE Lead_Model SHALL require an email field that is a valid email format, stored in lowercase and trimmed.
3. THE Lead_Model SHALL require a phone field that is a non-empty trimmed string with a maximum length of 20 characters.
4. THE Lead_Model SHALL restrict the status field to one of the values: `new`, `contacted`, `qualified`, `closed`, defaulting to `new`.
5. THE Lead_Model SHALL allow an optional note field that is a trimmed string with a maximum length of 500 characters.
6. THE Lead_Model SHALL store a source field defaulting to `external`, with possible values `external` and `admin-dashboard`.
7. THE Lead_Model SHALL maintain createdAt and updatedAt timestamps for each lead document.

### Requirement 3: Admin Lead Listing and Filtering

**User Story:** As an admin, I want to view all submitted leads and filter them by status, so that I can prioritize follow-up actions.

#### Acceptance Criteria

1. WHEN an authenticated admin requests the lead list, THE Admin_Lead_API SHALL return all lead documents sorted by creation date in descending order.
2. WHEN an authenticated admin requests the lead list with a status query parameter, THE Admin_Lead_API SHALL return only leads matching that status value.
3. WHEN an unauthenticated request is made to the lead list endpoint, THE Protect_Middleware SHALL return a 401 response and no lead data SHALL be returned.

### Requirement 4: Lead Status Management

**User Story:** As an admin, I want to update the status and notes of a lead, so that I can track my progress in following up with potential clients.

#### Acceptance Criteria

1. WHEN an authenticated admin updates a lead's status with a valid Lead_Status value, THE Admin_Lead_API SHALL update the lead document's status and refresh the updatedAt timestamp and return the updated lead.
2. WHEN an authenticated admin provides a note along with a status update, THE Admin_Lead_API SHALL update the lead document's note field.
3. IF the specified lead ID does not exist in the database, THEN THE Admin_Lead_API SHALL return a 404 response.
4. WHEN an unauthenticated request is made to the status update endpoint, THE Protect_Middleware SHALL return a 401 response and no lead data SHALL be modified.

### Requirement 5: Lead Deletion

**User Story:** As an admin, I want to delete leads that are no longer relevant, so that I can keep my lead list clean and manageable.

#### Acceptance Criteria

1. WHEN an authenticated admin deletes a lead by ID, THE Admin_Lead_API SHALL remove the lead document from the database and return a 200 response.
2. IF the specified lead ID does not exist in the database, THEN THE Admin_Lead_API SHALL return a 404 response.
3. WHEN an unauthenticated request is made to the delete endpoint, THE Protect_Middleware SHALL return a 401 response and no lead data SHALL be deleted.

### Requirement 6: Lead Statistics

**User Story:** As an admin, I want to see a summary of lead counts by status, so that I can quickly understand my pipeline at a glance.

#### Acceptance Criteria

1. WHEN an authenticated admin requests lead statistics, THE Admin_Lead_API SHALL return an object containing the count of leads for each Lead_Status value and a total count.
2. THE Admin_Lead_API SHALL ensure the total count equals the sum of all individual status counts.
3. WHEN an unauthenticated request is made to the stats endpoint, THE Protect_Middleware SHALL return a 401 response.

### Requirement 7: Admin Dashboard — Add Lead Form

**User Story:** As an admin, I want to manually add leads from the dashboard, so that I can enter contact information from phone calls, meetings, or other offline sources.

#### Acceptance Criteria

1. THE Leads_Page SHALL display an "Add Lead" button that opens a form for entering name, email, and phone number.
2. WHEN the admin submits the Add Lead form with a non-empty name, valid email, and non-empty phone, THE Leads_Page SHALL call the Lead_API_Public with JWT authentication to create a lead with source `admin-dashboard`.
3. WHEN the admin submits the Add Lead form with invalid data, THE Leads_Page SHALL display inline validation errors and prevent submission.
4. WHEN a lead is successfully added, THE Leads_Page SHALL display a success message and refresh the lead list to show the new entry.

### Requirement 8: Admin Dashboard Integration

**User Story:** As an admin, I want the leads management page to be accessible from the existing dashboard navigation, so that I can manage leads alongside blogs, games, and comments.

#### Acceptance Criteria

1. THE Leads_Page SHALL be accessible via a navigation link in the DashboardLayout sidebar under an appropriate section.
2. THE Leads_Page SHALL be protected by the existing ProtectedRoute component requiring authentication.
3. WHEN the Leads_Page loads, THE Leads_Page SHALL fetch and display leads from the Admin_Lead_API and show status filter controls and lead count badges.
4. WHEN an admin changes a lead's status on the Leads_Page, THE Leads_Page SHALL call the Admin_Lead_API to persist the change and update the displayed data.
5. WHEN an admin deletes a lead on the Leads_Page, THE Leads_Page SHALL prompt for confirmation, call the Admin_Lead_API, and remove the lead from the displayed list.
6. THE Leads_Page SHALL display the lead source (external or admin-dashboard) for each lead in the list.

### Requirement 9: External Integration (CORS)

**User Story:** As a site owner, I want external sites like course.jainish.space to be able to submit leads via the API, so that I can capture leads from all my web properties.

#### Acceptance Criteria

1. THE CORS configuration in `Backend/server.js` SHALL include `https://course.jainish.space` in the allowed origins list.
2. WHEN a cross-origin POST request is made from course.jainish.space to `/api/leads`, THE server SHALL respond with appropriate CORS headers allowing the request.
