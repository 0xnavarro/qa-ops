# Quality Core

Apply these rules in all implementation, review, QA, and pre-merge work.

- Only the implementation agent may modify application code unless the user explicitly authorizes otherwise.
- QA and review agents should detect, document, reproduce, and verify; they should not silently patch product code.
- Distinguish clearly between findings and non-blocking suggestions.
- Every accepted finding must be logged in `docs/quality/findings/open.md`.
- A fix is not closed until it is verified by review or QA.
- Use finding statuses consistently: NEW, TRIAGED, ACCEPTED, REJECTED, DEFERRED, FIXED_PENDING_VERIFICATION, VERIFIED_CLOSED.
- Do not create duplicate findings when an equivalent finding already exists.
- Do not open or merge a PR with unresolved P0 or P1 findings.
