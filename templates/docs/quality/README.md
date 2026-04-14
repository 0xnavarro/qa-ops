# Quality Documentation

This directory is the canonical location for quality governance artifacts.

## Prerequisite

This system assumes spec-driven development. Before auditing or running QA, you should have:
- Requirements (functional + non-functional)
- Design document (architecture, decisions, constraints)
- Implementation plan (phases, tasks, acceptance criteria)

Audits and QA sessions reference these specs. Without them, findings lack traceability.

## Structure

- `review-sop.md` — Human-readable operating procedure (roles, sequence, merge gate)
- `findings/open.md` — Live backlog of findings being triaged, fixed, or verified
- `findings/closed.md` — Historical log of verified, rejected, or formally deferred findings
- `templates/` — Reusable templates for findings, QA sessions, audits, and re-verification
- `report/` — One file per audit or QA session

## Rules

- Do not mix policy, SOP, and live findings in the same file.
- Keep live findings in `findings/open.md`.
- Move items to `findings/closed.md` only when they are VERIFIED_CLOSED, REJECTED, or formally DEFERRED.
