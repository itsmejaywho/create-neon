# Input Validation Test Checklist

Read this file only when the user explicitly asks for input validation test guidance or asks to read `INPUT_VALIDATION_TESTS.md`.

## Missing Validation
- Check every API boundary, form submit handler, route parameter, query string, request body, and imported data source.
- Require expected fields and reject unknown or malformed fields when appropriate.
- Validate type, length, format, range, enum values, and required relationships between fields.
- Validate on the server side for any data that affects authentication, authorization, storage, payments, admin actions, or external integrations.
- Do not rely on client-side validation as the only control.

## Missing Sanitization
- Sanitize or normalize input before using it in rendering, searches, filenames, URLs, logs, or third-party requests.
- Escape output based on the destination context, such as HTML, attributes, URLs, SQL, shell arguments, LDAP filters, or templates.
- Trim and normalize identifiers such as emails, usernames, slugs, tags, and search terms when needed.
- Avoid storing unsanitized rich text unless a trusted sanitizer and allowlist are used.

## Unsafe File Uploads
- Validate file type using content inspection where practical, not only extension or client-provided MIME type.
- Enforce file size limits, upload count limits, and storage quotas.
- Store uploads outside executable/static code directories unless they are meant to be public assets.
- Generate safe server-side filenames instead of trusting uploaded filenames.
- Strip or reject path separators, control characters, and traversal sequences in file names.
- Scan or quarantine risky file types when the application accepts documents, archives, executables, or user-provided media.
- Serve uploads with safe content types and `Content-Disposition` when files should download instead of render.

## Unsafe URL Handling
- Validate URLs before redirects, fetches, embeds, webhooks, callbacks, and external links.
- Allowlist expected protocols such as `https:` and reject `javascript:`, `data:`, `file:`, and unexpected schemes.
- Prevent open redirects by allowlisting trusted hosts or using relative paths only.
- For server-side fetches, protect against SSRF by blocking private IP ranges, localhost, metadata services, and internal hostnames.
- Normalize and parse URLs with standard URL APIs before making security decisions.

## Unsafe Path Handling
- Normalize and resolve filesystem paths before reading, writing, deleting, downloading, or serving files.
- Ensure resolved paths remain inside the intended base directory.
- Reject absolute paths, `../`, encoded traversal sequences, null bytes, and unexpected path separators where appropriate.
- Use allowlisted file names or IDs instead of raw user-provided paths when possible.
- Avoid exposing full local paths in errors, logs, or API responses.

## General Notes
- Add tests for valid input, malformed input, boundary values, encoded payloads, and blocked payloads.
- Keep validation schemas close to the API or action they protect.
- Prefer shared schema validators when the project already uses one.
