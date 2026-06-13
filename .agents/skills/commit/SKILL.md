---

name: commit
description: Create professional Git commits and push changes to the remote repository. Use when code, documentation, configuration, tests, database migrations, or project files have been modified and the user wants changes committed. Follow Conventional Commits (feat, fix, refactor, docs, test, chore, perf, build, ci, revert). Analyze the diff before committing and generate clear, meaningful commit messages.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Commit & Push Skill

## Purpose

This skill creates high-quality Git commits using the Conventional Commits specification and pushes changes to the configured remote repository.

Use this skill whenever the user requests:

* Commit changes
* Push changes
* Save work to Git
* Create a commit message
* Publish completed work
* Prepare a clean commit history

## Commit Message Rules

Follow Conventional Commits:

### Features

```bash
feat: add dispute resolution workflow
feat(auth): implement email verification
feat(payments): add escrow release endpoint
```

### Bug Fixes

```bash
fix: prevent duplicate payment processing
fix(auth): resolve session expiration issue
fix(ui): correct mobile navigation overflow
```

### Refactoring

```bash
refactor: simplify payment service logic
refactor(database): improve repository structure
```

### Documentation

```bash
docs: update setup instructions
docs(api): document dispute endpoints
```

### Tests

```bash
test: add payment workflow tests
test(auth): cover token validation cases
```

### Performance

```bash
perf: optimize task search queries
perf(database): reduce N+1 queries
```

### Chores

```bash
chore: update dependencies
chore: configure linting rules
```

### CI/CD

```bash
ci: add deployment workflow
build: update production build configuration
```

## Workflow

1. Review changed files.
2. Review Git diff.
3. Determine the primary purpose of the change.
4. Generate a Conventional Commit message.
5. Stage relevant files.
6. Create commit.
7. Push to current branch.
8. Report:

   * Commit message used
   * Branch name
   * Files changed
   * Push result

## Commit Selection Guidelines

Prioritize:

1. feat
2. fix
3. perf
4. refactor
5. test
6. docs
7. chore

If multiple types exist, choose the type representing the main purpose of the change.

## Examples

### Example 1

Changes:

* Added escrow table
* Added dispute endpoints
* Added payment workflow

Commit:

```bash
git commit -m "feat(payments): implement escrow and dispute workflow"
```

### Example 2

Changes:

* Fixed duplicate refund bug

Commit:

```bash
git commit -m "fix(payments): prevent duplicate refunds"
```

### Example 3

Changes:

* Added indexes for task search

Commit:

```bash
git commit -m "perf(database): optimize task search indexing"
```

## Safety Rules

* Never force push unless explicitly requested.
* Never rewrite Git history unless explicitly requested.
* Never commit secrets, credentials, API keys, tokens, or `.env` files.
* Review staged files before committing.
* Warn if sensitive files appear in the commit.
* Verify repository status before pushing.

## Push Command

```bash
git push origin <current-branch>
```

Use the current checked-out branch unless the user specifies otherwise.
