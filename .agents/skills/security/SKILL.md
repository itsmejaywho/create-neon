---

name: security
description: Perform a security audit of the codebase. Use when reviewing new features, APIs, authentication, database changes, payment systems, user input handling, file uploads, or before committing and deploying. Identify vulnerabilities, security misconfigurations, insecure dependencies, missing authorization checks, injection risks, and data exposure issues.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Security Review Skill

## Purpose

Perform a comprehensive security review before committing, merging, releasing, or deploying code.

## Security Review Checklist

### Input Validation

Check for:

* Missing validation
* Missing sanitization
* Unsafe file uploads
* Unsafe URL handling
* Unsafe path handling

### Injection Attacks

Check for:

* SQL Injection
* NoSQL Injection
* Command Injection
* Path Traversal
* LDAP Injection
* Template Injection

### Authentication

Verify:

* Authentication is required where appropriate
* Tokens are validated
* Sessions are handled securely
* Passwords are hashed securely
* MFA protections remain intact

### Authorization

Verify:

* Resource ownership checks exist
* Users cannot access other users' data
* Role checks are enforced
* Protected routes verify permissions

### Web Security

Check for:

* XSS vulnerabilities
* CSRF vulnerabilities
* Open redirects
* SSRF vulnerabilities
* Clickjacking concerns

### Secrets

Verify:

* No secrets in source code
* No API keys committed
* No credentials committed
* No `.env` files committed
* Environment variables are used

### Database Security

Verify:

* Parameterized queries are used
* ORM protections are used correctly
* Sensitive fields are protected
* Indexes do not expose sensitive information

### Payments

Verify:

* Duplicate payment protection
* Duplicate refund protection
* Escrow integrity
* Transaction safety
* Race condition protection

### Logging

Verify:

* No passwords logged
* No tokens logged
* No sensitive personal information logged
* Errors do not expose internals

### Dependencies

Review:

* Outdated dependencies
* Known vulnerable packages
* Unnecessary packages
* Excessive permissions

## Required Commands

### JavaScript / TypeScript

```bash
npm audit
npm run lint
npm run test
```

### pnpm

```bash
pnpm audit
pnpm lint
pnpm test
```

### Bun

```bash
bun audit
bun test
```

### Python

```bash
pip-audit
bandit -r .
pytest
```

## Report Format

Report:

1. Critical Issues
2. High Severity Issues
3. Medium Severity Issues
4. Low Severity Issues
5. Recommendations
6. Security Score

If no issues are found, explicitly state:

"Security review completed. No critical security issues identified."
