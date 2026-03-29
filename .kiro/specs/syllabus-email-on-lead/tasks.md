# Implementation Plan: Syllabus Email on Lead

## Overview

Extend the existing lead-creation flow so that when `syllabusRequested: true` is submitted, the backend persists the flag and fires off a syllabus PDF email via Hostinger SMTP — without blocking the API response. Implementation uses Nodemailer, configured through environment variables, with full fire-and-forget resilience.

## Tasks

- [x] 1. Update Lead model and route to accept `syllabusRequested`
  - [x] 1.1 Add `syllabusRequested` boolean field to Lead schema
    - Add `syllabusRequested: { type: Boolean, default: false }` to `Backend/models/Lead.js`
    - _Requirements: 5.1, 1.2_

  - [x] 1.2 Update POST /api/leads route to accept and persist `syllabusRequested`
    - In `Backend/routes/leads.js`, destructure `syllabusRequested` from `req.body`
    - Pass it to `Lead.create()` alongside existing fields
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.3 Write property tests for syllabusRequested persistence and default
    - **Property 1: syllabusRequested persistence** — For any valid lead with `syllabusRequested: true`, verify the persisted document has `syllabusRequested === true`
    - **Validates: Requirements 1.1**
    - **Property 2: syllabusRequested defaults to false** — For any valid lead omitting `syllabusRequested`, verify the persisted document has `syllabusRequested === false`
    - **Validates: Requirements 1.2, 5.1**

  - [x] 1.4 Write property test for validation unchanged by syllabusRequested
    - **Property 3: Validation unchanged by syllabusRequested** — For any lead missing required fields, verify 400 response regardless of `syllabusRequested` value
    - **Validates: Requirements 1.3**

- [x] 2. Checkpoint — Verify lead model and route changes
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Create email service and wire into lead route
  - [x] 3.1 Install Nodemailer dependency
    - Run `npm install nodemailer` in `Backend/`
    - _Requirements: 2.1_

  - [x] 3.2 Create `Backend/services/emailService.js`
    - Implement `isConfigured()` — checks all four SMTP env vars are present, logs warning if missing
    - Implement `createTransporter()` — returns Nodemailer transporter with Hostinger SMTP settings
    - Implement `sendSyllabusEmail(lead)` — composes email with PDF attachment, sends via transporter, wraps in try/catch, always resolves
    - Email subject: `"Here is your 12-Month Game Development Syllabus"`
    - Attachment path: `Backend/12-Month Game Development Syllabus.pdf`
    - Greeting body addresses lead by name
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 3.3 Wire email service into POST /api/leads route
    - After successful `Lead.create()`, if `syllabusRequested === true`, call `sendSyllabusEmail(lead)` without `await` (fire-and-forget)
    - _Requirements: 2.1, 3.1, 3.2, 3.3_

  - [x] 3.4 Write property test for email triggered on syllabusRequested
    - **Property 4: Email triggered on syllabusRequested** — For any successfully created lead with `syllabusRequested: true`, verify `sendSyllabusEmail` is invoked with the lead's email and name
    - **Validates: Requirements 2.1**

  - [x] 3.5 Write property test for email composition correctness
    - **Property 5: Email composition correctness** — For any lead passed to `sendSyllabusEmail`, verify the email contains an attachment with filename `12-Month Game Development Syllabus.pdf` and the body contains the lead's name
    - **Validates: Requirements 2.2, 2.4**

  - [x] 3.6 Write property test for email failure resilience
    - **Property 6: Email failure resilience** — For any SMTP failure, verify the lead-creation endpoint still returns 201 and the error is logged with lead identifier and email
    - **Validates: Requirements 3.1, 3.2**

  - [x] 3.7 Write property test for async email delivery
    - **Property 7: Async email delivery** — For any lead with `syllabusRequested: true`, verify the HTTP response returns before the email promise resolves
    - **Validates: Requirements 3.3**

- [x] 4. Checkpoint — Verify email service integration
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Add environment variables and verify admin endpoint
  - [x] 5.1 Add Hostinger SMTP env vars to `.env.example`
    - Add `HOSTINGER_SMTP_HOST`, `HOSTINGER_SMTP_PORT`, `HOSTINGER_EMAIL`, `HOSTINGER_EMAIL_PASS` placeholders
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 5.2 Write unit tests for admin endpoint including syllabusRequested
    - Verify `GET /api/leads/admin/all` response includes `syllabusRequested` field with correct value
    - _Requirements: 5.2_

  - [x] 5.3 Write property test for admin response includes syllabusRequested
    - **Property 8: Admin response includes syllabusRequested** — For any leads with random `syllabusRequested` values, verify the admin GET endpoint returns the field with the correct stored value
    - **Validates: Requirements 5.2**

- [x] 6. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests require `fast-check` as a dev dependency (`npm install --save-dev fast-check` in `Backend/`)
- The syllabus PDF already exists at `Backend/12-Month Game Development Syllabus.pdf`
- Nodemailer needs to be added as a production dependency
