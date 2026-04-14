# Finding Template

Use this exact structure for every finding. Copy and paste into `findings/open.md`.

---

```markdown
### [FINDING_ID] Short descriptive title
- Status: NEW | TRIAGED | ACCEPTED | REJECTED | DEFERRED | FIXED_PENDING_VERIFICATION | VERIFIED_CLOSED
- Severity: P0 | P1 | P2 | P3
- Type: FUNCTIONAL_BUG | SPEC_MISMATCH | SECURITY | PERFORMANCE | RELIABILITY | UX | ACCESSIBILITY | TEST_GAP | CODE_QUALITY | ARCHITECTURE | DOCUMENTATION
- Source: audit | QA session | review | re-audit | final audit
- Branch: feature-branch-name
- Affected area: file/module/component path
- Spec / Requirement reference: US-X, NFR-X, or design section
- Summary: One paragraph describing the issue clearly.
- Evidence: Code snippet, SQL query result, API response, or screenshot reference.
- Reproduction steps:
  1. Step one
  2. Step two
  3. Step three
- Expected behavior: What should happen.
- Actual behavior: What actually happens.
- Recommended fix: Concrete suggestion for resolution.
- Owner: Implementation agent | specific person
- Opened: YYYY-MM-DD
- Last updated: YYYY-MM-DD
- Verification notes: (filled by verifier when closing)
```

---

## Severity guide

| Level | Criteria | Blocks merge? |
|---|---|---|
| P0 | Release blocker, security breach, data loss, broken core flow | Yes |
| P1 | Major functional defect, serious spec mismatch, major regression | Yes |
| P2 | Moderate defect, important edge case, non-blocking regression | No |
| P3 | Minor defect, cosmetic issue, low-risk polish | No |

## Finding ID conventions

Use a prefix that identifies the source:

- `AUDIT-XXX` — Technical audit findings
- `QA-XXX` — QA session findings
- `SEC-XXX` — Security-focused findings
- `FINAL-XXX` — Final pre-merge audit findings
- `FE-XXX` — Frontend/UX findings
- `DATA-XXX` — Data integrity findings
- `ARCH-XXX` — Architecture findings

## Rules

- A finding is NOT closed just because the implementer says it's fixed.
- FIXED_PENDING_VERIFICATION → requires verification by auditor or QA.
- Only VERIFIED_CLOSED findings move to `closed.md`.
- Check for duplicates before creating a new finding.
