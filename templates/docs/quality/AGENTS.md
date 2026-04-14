# QA Ops — Agent Instructions

> This file is for AI agents. After `npx create-qa-ops` scaffolds the quality system,
> read this file and execute the setup steps below to configure everything for this project.

## What was just installed

A quality governance system with:
- `docs/quality/review-sop.md` — Operating procedure (roles, sequence, merge gate)
- `docs/quality/findings/open.md` — Live findings backlog
- `docs/quality/findings/closed.md` — Closed findings archive
- `docs/quality/templates/` — Prompt templates for QA, audits, and re-verification
- `.kiro/steering/quality-core.md` — Base quality rules (always active)
- `.kiro/steering/finding-governance.md` — Finding lifecycle governance

## Setup steps — execute now

### Step 1: Understand the project

Read the project structure to identify:
- App framework and language (Next.js, Django, Rails, etc.)
- Route/page structure (what pages and API routes exist)
- Database tool available (Supabase MCP, Prisma, raw SQL, etc.)
- App URL for local development (usually `http://localhost:3000` or similar)
- Spec/requirements location (if any)
- Design/architecture docs location (if any)

### Step 2: Configure prompt templates

Replace all `{{PLACEHOLDERS}}` in these files with actual project values:

**`docs/quality/templates/qa-session-prompt.md`**
- `{{PROJECT_NAME}}` → project name
- `{{APP_URL}}` → local dev URL
- `{{DB_TOOL}}` → database tool name (e.g., "Supabase MCP", "Prisma")
- `{{DB_PROJECT_ID}}` → database project ID (if applicable)
- `{{DB_QUERY_TOOL}}` → specific query tool (e.g., "mcp_supabase_execute_sql")
- `{{TEST_CREDENTIALS_INSTRUCTIONS}}` → how to get test user credentials
- `{{QA_SECTIONS}}` → replace the placeholder with actual test sections based on the app's features (use the examples in the comments as guidance)

**`docs/quality/templates/audit-prompt.md`**
- Same placeholders as above, plus:
- `{{BRANCH_NAME}}` → leave as placeholder (filled per audit)
- `{{SPEC_PATH}}` → path to requirements/specs
- `{{DESIGN_PATH}}` → path to design docs
- `{{AUDIT_DIMENSIONS}}` → replace with actual audit dimensions based on the project's architecture (use the examples in the comments as guidance)

**`docs/quality/templates/reverify-prompt.md`**
- Same base placeholders (project name, app URL, DB tool)
- Leave `{{FINDING_IDS_AND_DESCRIPTIONS}}` and `{{ACCEPTANCE_CRITERIA_PER_FINDING}}` as placeholders (filled per verification session)

### Step 3: Generate a QA checklist

Create `docs/quality/qa-checklist.md` based on the app's actual features:
- Use `docs/quality/templates/qa-checklist-skeleton.md` as the base structure
- Read the project's routes, pages, and API endpoints
- Create concrete test items for each feature area
- Include: auth flows, core CRUD, business logic, API security, billing (if applicable), responsive, error handling
- Each item should be a checkbox that a QA agent can mark as ✅ PASS, ❌ FAIL, or ⏭️ SKIP

### Step 4: Verify steering files

- If using Kiro: confirm `.kiro/steering/quality-core.md` and `.kiro/steering/finding-governance.md` exist and have correct frontmatter
- If `.kiro/steering/` already had files: verify no conflicts with existing steering rules
- If using another IDE: note that the user should include the content of these files in their project rules or system prompt

### Step 5: Report what you did

Tell the user:
- What was configured and what values were filled in
- What they need to do manually (e.g., set up Playwright MCP, configure DB access, create test users)
- That the system is ready — they can now run QA sessions, audits, and track findings

## Ongoing usage

After setup, the quality system works like this:

1. **During implementation**: steering files automatically remind agents of quality rules
2. **For QA**: copy the configured `qa-session-prompt.md` into a new agent session
3. **For audits**: copy the configured `audit-prompt.md` into a session with a different model
4. **For re-verification**: copy `reverify-prompt.md` and fill in the specific findings to verify
5. **Findings**: always log in `findings/open.md`, move to `findings/closed.md` only after verification
6. **Reports**: save each QA/audit session report in `docs/quality/report/`

## Rules

- Do not modify application code from this setup — only quality governance files
- Ask the user if anything is unclear about the project structure
- Use actual file paths, route names, and feature names from this project
