# Review and Findings SOP

## Purpose

Human-readable operating procedure for running implementation, audit, QA, and pre-merge quality control in an agent-assisted development workflow.

## Canonical roles

| Role | Responsibility | Modifies code? |
|---|---|---|
| **Orchestrator** (human) | Coordinates lifecycle, triages findings, decides merge readiness | No |
| **Implementer** (agent) | Executes tasks, fixes accepted findings | Yes — only role that modifies app code |
| **Auditor** (agent) | Technical audit, detects findings, evaluates spec alignment | No |
| **QA agent** (agent) | Executes browser/product flows, validates observable behavior | No |
| **Final auditor** (agent, different model family) | Final review before merge, different perspective | No |

## Operating sequence

```
1. Spec → Design → Implementation plan
2. Implement in feature branch
3. Technical audit → log findings
4. Triage findings (orchestrator)
5. Fix accepted findings (implementer)
6. Re-audit
7. QA on critical flows → log findings
8. Fix accepted QA findings
9. Verify fixes (auditor or QA, not implementer)
10. Final pre-merge audit (different model family)
11. Check merge gate
12. PR and merge
```

## Merge gate

The branch MUST NOT be merged unless:

- [ ] No open P0 findings
- [ ] No open P1 findings
- [ ] All accepted findings are VERIFIED_CLOSED or formally DEFERRED
- [ ] Critical QA flows passed
- [ ] Findings logs are current and consistent

## Practical rules

- An implementer can fix but cannot close — closure requires verification by another role.
- QA verifies product behavior, not implementation style.
- Auditors must separate findings from suggestions.
- Findings must be deduplicated before logging.
- Repeated failure patterns should feed back into steering/rules updates.
- Use at least two model families to reduce blind spots (e.g., Claude for implementation, GPT for final audit).

## Multi-model rationale

A single model family has training biases and blind spots. Using a different model family for the final audit systematically catches issues the primary model misses. This is not redundancy — it's a deliberate quality control mechanism.
