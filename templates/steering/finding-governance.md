---
inclusion: auto
name: finding-governance
description: Use when auditing a branch, reviewing before merge, triaging findings, validating fixes, running QA against requirements, or deciding merge readiness.
---

# Finding Governance

## Purpose

This steering file defines the mandatory process for handling findings during implementation, review, QA, and final pre-merge audit. It applies to all branches, all features, all bugfixes, and all reviews.

## Core rule

Only the implementation agent may modify application code unless the user explicitly authorizes otherwise. Reviewers, auditors, and QA agents must not silently modify code. Their responsibility is to detect, document, classify, and verify.

## Findings are mandatory structured artifacts

Every finding must be documented before being acted on. Each finding must include:

- Finding ID, Title, Status, Severity, Type
- Source, Branch, Affected area
- Spec/requirement reference
- Evidence
- Reproduction steps (when applicable)
- Expected behavior, Actual behavior
- Recommended fix
- Owner, Open date, Last update date

## Allowed statuses

Use only these statuses:

| Status | Meaning |
|---|---|
| NEW | Just identified, not yet triaged |
| TRIAGED | Reviewed by orchestrator, pending decision |
| ACCEPTED | Confirmed valid, assigned for fix |
| REJECTED | Determined invalid or not applicable (with rationale) |
| DEFERRED | Valid but intentionally postponed (with rationale) |
| FIXED_PENDING_VERIFICATION | Fix applied, awaiting verification by another role |
| VERIFIED_CLOSED | Fix verified by auditor or QA — ready to move to closed.md |

## Severity model

| Level | Criteria | Blocks merge? |
|---|---|---|
| P0 | Release blocker, security breach, data loss, broken core flow | Yes |
| P1 | Major functional defect, serious spec mismatch, major regression | Yes |
| P2 | Moderate defect, important edge case, non-blocking regression | No |
| P3 | Minor defect, cosmetic issue, low-risk polish | No |

## Type model

Use exactly one primary type:

`FUNCTIONAL_BUG` · `SPEC_MISMATCH` · `SECURITY` · `PERFORMANCE` · `RELIABILITY` · `UX` · `ACCESSIBILITY` · `TEST_GAP` · `CODE_QUALITY` · `ARCHITECTURE` · `DOCUMENTATION`

## Findings workflow

```
1. Auditor/QA identifies finding
2. Finding appended to docs/quality/findings/open.md
3. Orchestrator triages (NEW → TRIAGED)
4. Decision: ACCEPTED / REJECTED / DEFERRED (with rationale)
5. Implementer fixes accepted findings
6. Status → FIXED_PENDING_VERIFICATION
7. Auditor or QA verifies the fix
8. Status → VERIFIED_CLOSED, moved to closed.md
```

A finding must NEVER be moved to closed only because the implementer claims it is fixed.

## Deduplication rule

Before creating a new finding, check whether an equivalent finding already exists in open findings. If overlap exists: update the existing finding, append evidence, add the new source. Do not create a duplicate.

## Review output requirements

Reviewers and auditors must not return vague feedback. Every non-trivial observation must either:
- Become a structured finding, OR
- Be explicitly marked as a non-blocking suggestion

Suggestions must be clearly separated from findings.

## Merge gate

A branch is not ready for PR or merge unless ALL of the following are true:

- [ ] No open P0 findings
- [ ] No open P1 findings
- [ ] All accepted findings are VERIFIED_CLOSED or formally DEFERRED
- [ ] Critical QA flows completed
- [ ] Final review completed
- [ ] Findings logs updated and consistent

## Agent behavior rules

### Implementation agents
- Never ignore an accepted finding
- Reference the Finding ID when fixing
- After fixing, mark as FIXED_PENDING_VERIFICATION — never VERIFIED_CLOSED

### Review/Audit agents
- Audit against requirements, design, changed code, regression risk, and merge readiness
- Prefer precise, high-signal findings over volume
- Distinguish blockers from suggestions
- Cite exact requirement or observed behavior

### QA agents
- Execute flows against expected behavior
- Create structured findings for failures
- Do not silently patch product code
- Verification of a fix must update the finding clearly

## Output format

Use the structure defined in `docs/quality/templates/finding-template.md` for every finding.

## Default principle

Low-signal feedback is worse than no feedback. Prefer fewer, higher-quality, evidence-based findings.
