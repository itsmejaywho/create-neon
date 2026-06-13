# Secrets Security Test Checklist

Read this file only when the user explicitly asks for secrets security test guidance or asks to read `SECRETS_SECURITY_TESTS.md`.

## Source Code Secrets
- Search source files for hardcoded API keys, tokens, passwords, private URLs, certificates, and credentials.
- Check config files, examples, tests, scripts, deployment files, and documentation for accidental secrets.
- Do not add placeholder values that look like real credentials.
- Replace hardcoded sensitive values with environment variable references.

## Committed API Keys
- Verify no API keys are tracked by git.
- Review recent diffs before committing for keys, tokens, auth headers, webhook secrets, and service credentials.
- Rotate any key that was committed, even if later removed.
- Avoid exposing service-role, admin, or private keys to browser/client code.

## Committed Credentials
- Check for committed usernames/passwords, database URLs, connection strings, SSH keys, private keys, OAuth client secrets, and access tokens.
- Ensure generated credentials and local development credentials stay out of version control.
- Store credentials in a secret manager or deployment environment settings.
- Never log credentials or include them in error messages.

## Environment Files
- Confirm real `.env`, `.env.local`, `.env.production`, and similar files are ignored by git.
- Commit only safe examples such as `.env.example` or `.env.sample`.
- Example env files must use fake values and document required variable names.
- Check whether previously committed env files need removal from git history and secret rotation.

## Environment Variables
- Read secrets from environment variables at runtime.
- Validate required environment variables during startup or before the feature uses them.
- Keep public client-side variables clearly separated from private server-only variables.
- Treat browser-exposed variables, such as `VITE_*`, as public and never store private secrets there.

## General Notes
- Search both tracked and untracked files when reviewing local work.
- Check git status before commits to avoid accidentally adding secret files.
- Avoid pasting secret values into issue reports, logs, screenshots, or chat.
- Add secret scanning to CI when practical.
