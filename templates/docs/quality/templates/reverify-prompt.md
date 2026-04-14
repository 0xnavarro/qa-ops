# Re-Verification Prompt — Template

> Use this prompt when you need a QA or audit agent to verify
> that a specific finding was correctly resolved.

---

## PROMPT

You are the QA agent for {{PROJECT_NAME}}. Re-verify the following findings:

{{FINDING_IDS_AND_DESCRIPTIONS}}

<!-- Example:
- QA-001: Login redirect broken after session timeout
- QA-002: Credit deduction race condition under concurrent load
-->

### Context
- App: {{APP_URL}} (must be running)
- {{DB_TOOL}} connected to project `{{DB_PROJECT_ID}}`
- Open findings: `docs/quality/findings/open.md`

### For each finding, verify:

1. Reproduce the original scenario described in "Reproduction steps"
2. Confirm that "Expected behavior" is now met
3. Verify in DB if applicable (verification queries)
4. Document evidence of the result

### Acceptance criteria per finding:

{{ACCEPTANCE_CRITERIA_PER_FINDING}}

<!-- Example:
**QA-001:**
- Login → redirect to dashboard works
- Expired session → redirect to login
- Verify in DB that session was destroyed

**QA-002:**
- Send 3 concurrent requests → only 1 deduction
- Verify in DB: credit_usage has exactly 1 row
-->

### If PASS:
1. In `docs/quality/findings/open.md` change status to VERIFIED_CLOSED
2. Move the finding to `docs/quality/findings/closed.md`
3. Update summary in open.md
4. Commit with message: `docs(findings): close {{FINDING_IDS}} verified`

### If FAIL:
- Document the exact error, logs, and DB state
- Update the finding in open.md with new evidence
- DO NOT modify application code

### Rules
- DO NOT modify application code
- Use {{DB_QUERY_TOOL}} for DB verifications, not to modify data
- If the app is not running, say so and stop
