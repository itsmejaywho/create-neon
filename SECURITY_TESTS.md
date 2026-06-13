# Security Test Checklist

Read this file only when the user explicitly asks for security test guidance or asks to read `SECURITY_TESTS.md`.

## SQL Injection
- Check database queries that include user-controlled input.
- Prefer parameterized queries, prepared statements, or trusted ORM/query-builder APIs.
- Test login, search, filters, sorting, reporting, and admin query inputs.
- Confirm error messages do not expose query details or schema information.

## NoSQL Injection
- Check object-based query inputs, especially JSON request bodies.
- Reject unexpected operators such as `$ne`, `$gt`, `$where`, or similar query modifiers unless explicitly allowed.
- Validate request schemas before passing data into database calls.
- Avoid directly merging user input into query objects.

## Command Injection
- Check every place user input reaches shell commands, process execution, scripts, or build tools.
- Prefer native APIs over shell commands.
- If command execution is required, pass arguments as structured arrays and allowlist valid values.
- Do not concatenate untrusted input into command strings.

## Path Traversal
- Check file reads, writes, downloads, uploads, imports, and export paths.
- Normalize and resolve paths before use.
- Ensure resolved paths stay inside the intended base directory.
- Reject `../`, absolute paths, encoded traversal sequences, and unexpected separators when appropriate.

## LDAP Injection
- Check authentication, directory search, and identity lookup filters.
- Escape LDAP filter values before use.
- Avoid constructing LDAP filters with raw user input.
- Validate allowed attributes and search scopes.

## Template Injection
- Check server-side templates, email templates, document generation, and user-customizable templates.
- Do not render untrusted template syntax with privileged context.
- Use safe rendering modes and restrict available helpers/functions.
- Escape rendered output by default, especially for HTML.

## General Notes
- Validate input at API boundaries.
- Use allowlists for enums, identifiers, filenames, and command options.
- Avoid leaking stack traces, credentials, tokens, or sensitive data in logs.
- Add tests for blocked payloads and normal valid inputs.
