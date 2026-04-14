# create-qa-ops

[![npm version](https://img.shields.io/npm/v/create-qa-ops.svg)](https://www.npmjs.com/package/create-qa-ops)
[![license](https://img.shields.io/npm/l/create-qa-ops.svg)](https://github.com/0xnavarro/qa-ops/blob/main/LICENSE)

> Quality governance for agent-assisted software development.

Scaffold a complete quality system — findings, audits, QA sessions, merge gates — designed for AI agents to read and execute.

Based on [Founder-Led Engineering Ops](https://www.0xnavarro.com/es/writing/founder-led-engineering-ops/).

## Quick start

```bash
npx create-qa-ops
```

That's it. Run it from your project root and it scaffolds everything.

## What it creates

```
your-project/
├── docs/quality/
│   ├── README.md                          # Index
│   ├── AGENTS.md                          # Agent reads this to auto-configure everything
│   ├── review-sop.md                      # Operating procedure (roles, sequence, merge gate)
│   ├── findings/
│   │   ├── open.md                        # Live backlog of findings
│   │   └── closed.md                      # Historical log
│   ├── templates/
│   │   ├── finding-template.md            # Structure for every finding
│   │   ├── qa-session-prompt.md           # Prompt template for QA sessions
│   │   ├── audit-prompt.md                # Prompt template for pre-merge audits
│   │   ├── reverify-prompt.md             # Prompt template for fix re-verification
│   │   └── qa-checklist-skeleton.md       # Skeleton QA checklist to adapt
│   └── report/                            # One file per audit or QA session
└── .kiro/steering/
    ├── quality-core.md                    # Base rules (always active)
    └── finding-governance.md              # Finding lifecycle governance
```

Existing files are never overwritten.

## The system

### Roles

| Role | Does | Modifies code? |
|---|---|---|
| Orchestrator (human) | Coordinates, triages, decides merge readiness | No |
| Implementer (agent) | Executes tasks, fixes findings | Yes |
| Auditor (agent) | Technical audit, detects findings | No |
| QA (agent) | Browser/product flow validation | No |
| Final auditor (different model) | Last review before merge | No |

### Finding lifecycle

```
NEW → TRIAGED → ACCEPTED → FIXED_PENDING_VERIFICATION → VERIFIED_CLOSED
                         → REJECTED (with rationale)
                         → DEFERRED (with rationale)
```

A fix is not closed until a different role verifies it.

### Severity

| Level | Blocks merge? | Examples |
|---|---|---|
| P0 | Yes | Security breach, data loss, broken core flow |
| P1 | Yes | Major functional bug, serious spec mismatch |
| P2 | No | Moderate defect, edge case, non-blocking regression |
| P3 | No | Cosmetic, polish, minor code quality |

### Merge gate

A branch is not merge-ready unless:

- 0 open P0 findings
- 0 open P1 findings
- All accepted findings are verified closed or formally deferred
- Critical QA flows passed
- Findings logs updated

### Multi-model audit

Use at least two model families. The implementation model has blind spots — a different model family for the final audit systematically catches what the first one misses. This is not redundancy; it's a deliberate quality mechanism.

## How to use

1. Run `npx create-qa-ops` in your project
2. **Auto-configure with AI**: tell your agent to read `docs/quality/AGENTS.md` — it contains step-by-step instructions for the agent to configure everything automatically (replaces placeholders, generates a QA checklist from your actual routes, verifies steering files)
3. Or configure manually: read `docs/quality/review-sop.md` and replace `{{PLACEHOLDERS}}` in the prompt templates
4. Start logging findings in `docs/quality/findings/open.md`
5. Use the steering files (`.kiro/steering/`) if you're on Kiro — otherwise include their content in your agent's system prompt

### Prompt templates

The templates are ready to copy-paste into a new agent session:

- `qa-session-prompt.md` — Full QA session with Playwright MCP + DB verification
- `audit-prompt.md` — Pre-merge technical audit (security, data, architecture, API)
- `reverify-prompt.md` — Re-verify specific findings after fixes

Each template has `{{PLACEHOLDERS}}` for your app URL, DB tool, branch name, etc.

## Philosophy

This system exists because generating code is not the same as building software. AI agents accelerate execution, but quality requires specification, structured review, evidence-based findings, and human governance.

The goal is not maximum output — it's verifiable throughput with control.

### Prerequisite: spec-driven development

This quality system assumes you have specs before you audit. That means:
- Requirements (functional + non-functional)
- Design document (architecture, decisions, constraints)
- Implementation plan (phases, tasks, acceptance criteria)

Without specs, findings lack traceability and audits become opinion. The quality system governs the gap between "what was specified" and "what was built".

## Kiro steering files

If you use [Kiro](https://kiro.dev), the steering files are automatically injected into agent context:

- `quality-core.md` — Always active. Base rules for all agents.
- `finding-governance.md` — Auto-included when auditing, reviewing, or triaging.

If you use another IDE, include the content of these files in your project rules or system prompt.

## License

MIT — [0xnavarro](https://github.com/0xnavarro)
