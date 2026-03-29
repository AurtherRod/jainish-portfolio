# Requirements Document

## Introduction

When a new lead is submitted via the public `POST /api/leads` endpoint and the request body includes `syllabusRequested: true`, the system shall automatically send an email to the lead's email address with the "12-Month Game Development Syllabus" PDF attached and a greeting subject/body. This feature extends the existing lead-creation flow without changing the current lead storage or validation behaviour.

## Glossary

- **Lead_API**: The Express route handler at `POST /api/leads` that validates, deduplicates, and persists incoming lead submissions.
- **Email_Service**: A backend module responsible for composing and sending emails via an SMTP/transactional-email provider (e.g. Nodemailer with an SMTP relay).
- **Syllabus_PDF**: The file located at `Backend/12-Month Game Development Syllabus.pdf`.
- **Lead**: A prospective contact stored in MongoDB through the Lead model.

## Requirements

### Requirement 1: Accept Syllabus Request Flag

**User Story:** As a prospective lead, I want to indicate that I need the game development syllabus when I submit my contact information, so that I receive it automatically by email.

#### Acceptance Criteria

1. WHEN a lead submission includes `syllabusRequested` set to `true` in the request body, THE Lead_API SHALL accept the field and persist it on the Lead document.
2. WHEN a lead submission does not include the `syllabusRequested` field, THE Lead_API SHALL default the value to `false` and proceed with normal lead creation.
3. THE Lead_API SHALL continue to enforce all existing validation rules (name, email, phone) regardless of the `syllabusRequested` value.

### Requirement 2: Send Syllabus Email

**User Story:** As a prospective lead who requested the syllabus, I want to receive the PDF in my inbox right after submitting my information, so that I can start reviewing the programme immediately.

#### Acceptance Criteria

1. WHEN a lead is successfully created with `syllabusRequested` equal to `true`, THE Email_Service SHALL send an email to the lead's email address.
2. THE Email_Service SHALL attach the Syllabus_PDF file to the outgoing email.
3. THE Email_Service SHALL set the email subject to "Here is your 12-Month Game Development Syllabus".
4. THE Email_Service SHALL include a greeting body that addresses the lead by name and provides context about the attached syllabus.
5. IF the Syllabus_PDF file is not found at the expected path, THEN THE Email_Service SHALL log an error and THE Lead_API SHALL still return a successful lead-creation response without blocking on the email failure.

### Requirement 3: Email Delivery Resilience

**User Story:** As the system operator, I want lead creation to succeed even when the email service is unavailable, so that no leads are lost due to transient email failures.

#### Acceptance Criteria

1. IF the Email_Service fails to send the email (SMTP error, timeout, or provider rejection), THEN THE Lead_API SHALL log the error with the lead identifier and email address.
2. IF the Email_Service fails, THEN THE Lead_API SHALL still return a `201` success response for the lead creation.
3. THE Lead_API SHALL send the email asynchronously so that email delivery latency does not increase the lead-creation response time.

### Requirement 4: Hostinger Email Configuration

**User Story:** As a developer, I want Hostinger SMTP credentials and sender details to be configurable through environment variables, so that I can update credentials without modifying code.

#### Acceptance Criteria

1. THE Email_Service SHALL read the Hostinger SMTP server hostname from the `HOSTINGER_SMTP_HOST` environment variable (e.g. `smtp.hostinger.com`).
2. THE Email_Service SHALL read the Hostinger SMTP port from the `HOSTINGER_SMTP_PORT` environment variable (e.g. `465` for SSL or `587` for TLS).
3. THE Email_Service SHALL read the Hostinger email account address from the `HOSTINGER_EMAIL` environment variable.
4. THE Email_Service SHALL read the Hostinger email account password from the `HOSTINGER_EMAIL_PASS` environment variable.
5. THE Email_Service SHALL use the `HOSTINGER_EMAIL` value as the sender address for outgoing syllabus emails.
6. IF any required Hostinger SMTP environment variable is missing, THEN THE Email_Service SHALL log a warning at server startup and skip email sending at runtime rather than crashing.

### Requirement 5: Lead Model Update

**User Story:** As an admin reviewing leads, I want to see whether a lead requested the syllabus, so that I can tailor follow-up conversations.

#### Acceptance Criteria

1. THE Lead model SHALL include a `syllabusRequested` boolean field that defaults to `false`.
2. WHEN leads are retrieved via the admin endpoints, THE Lead_API SHALL include the `syllabusRequested` field in the response payload.
