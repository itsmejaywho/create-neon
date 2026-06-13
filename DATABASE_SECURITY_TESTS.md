# Database Security Test Checklist

Read this file only when the user explicitly asks for database security test guidance or asks to read `DATABASE_SECURITY_TESTS.md`.

## Parameterized Queries
- Check every raw SQL query that includes user-controlled input.
- Use parameterized queries, prepared statements, or trusted query-builder bindings.
- Do not concatenate user input into SQL strings, identifiers, `ORDER BY`, filters, joins, or pagination clauses.
- Allowlist dynamic table names, column names, sort keys, and sort directions.
- Test login, search, filtering, reporting, admin tools, imports, and background jobs.

## ORM Protections
- Use ORM APIs in their intended safe mode instead of raw query escape hatches.
- Avoid unsafe raw-query helpers unless inputs are parameterized and identifiers are allowlisted.
- Validate request data before passing it into ORM filters, updates, includes, or relation operations.
- Prevent mass assignment by allowlisting fields that may be created or updated.
- Confirm authorization checks happen before reads, writes, updates, deletes, and relation changes.

## Sensitive Fields
- Never return password hashes, reset tokens, session tokens, API keys, private notes, payment data, or internal security fields to clients.
- Select only the fields needed for each request instead of returning full records.
- Hash passwords with a strong password hashing algorithm and never store plaintext passwords.
- Encrypt or otherwise protect sensitive fields at rest when required by the application.
- Mask sensitive values in logs, admin views, exports, and error responses.

## Index Safety
- Do not create public/search indexes that expose sensitive fields.
- Avoid indexing secrets, tokens, password hashes, private notes, payment data, or unnecessary personal data.
- Review full-text/search indexes for accidental inclusion of sensitive columns.
- Ensure indexed data follows the same access-control rules as the underlying records.
- Document index rebuilds, migrations, and access-control assumptions.

## General Notes
- Enforce database permissions and row-level security where supported.
- Use least-privilege database credentials for the application.
- Keep migrations reviewed and reversible where practical.
- Add tests for unauthorized access, overbroad field selection, mass assignment, and injection payloads.
