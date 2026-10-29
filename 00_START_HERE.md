# AI STUDIO PROJECT — STRICT MASTER PLAN PACKAGE

**Purpose:** This package is the project’s working source of truth for implementation, verification, and progress tracking in Google AI Studio with ChatGPT-assisted review.

## Read these files in order
1. `01_MASTER_PLAN.md` — finalized product requirements and workflows.
2. `02_ARCHITECTURE_AND_DIAGRAMS.md` — system architecture and visual workflow diagrams.
3. `03_BUILD_STATUS_AND_TRACKER.md` — what is confirmed, what remains, and how to record progress.
4. `04_STRICT_COMPLIANCE_RULES.md` — non-negotiable implementation/change-control rules.
5. `05_SKILL_CONTRACTS.md` — four skill boundaries and expected behavior.
6. `06_DATA_MODEL_AND_LIFECYCLE.md` — project data, versions, stale outputs, retention, export/delete.
7. `07_AI_PROVIDER_MODEL_MANAGER.md` — provider/model configuration, security, execution, and user-approved fallback.
8. `08_UI_UX_SPEC.md` — screens, panels, visual direction, and behavior.
9. `09_TEST_AND_ACCEPTANCE_MATRIX.md` — test cases required before marking features complete.
10. `10_CHATGPT_GOOGLE_AI_STUDIO_SYNC.md` — handoff format for pasting Google AI Studio replies into ChatGPT.
11. `11_IMPLEMENTATION_ROADMAP.md` — implementation phases and gates.
12. `12_DECISION_REGISTER.md` — decisions finalized in the conversation.
13. `13_OPEN_ITEMS_AND_ASSUMPTIONS.md` — known boundaries and unresolved items that must not be guessed.
14. `14_CHANGELOG_AND_PROGRESS_LOG.md` — record every build attempt, result, and approved change.
15. `15_GOOGLE_AI_STUDIO_BOOTSTRAP_PROMPT.md` — initial prompt to give Google AI Studio.

## Status honesty
This ZIP contains the approved plan and implementation controls, **not a completed app or verified source code**. No application repository/source code was provided for an implementation audit in this conversation. Therefore:
- **Build completed:** No application features have been verified as built in this conversation.
- **Build in progress:** Not verified.
- **Build remaining:** The implementation roadmap in this package, beginning with an audit of the actual project/codebase.
- Do not mark an item `DONE` unless its code/configuration and applicable test evidence have been inspected.
- “Google AI Studio generated code” is not the same as “feature tested and accepted.”

## Working protocol
For each task:
1. Give Google AI Studio one scoped task from the roadmap.
2. Ask it to state the requirements and files it intends to change before editing.
3. Reject any proposed change outside the approved scope.
4. After it responds, paste its full response, diff/changed files, and test output into ChatGPT.
5. ChatGPT reviews for plan compliance, regressions, security, and test evidence.
6. Update the tracker and progress log only after evidence supports the status.
7. Never ask the next phase to start until the current phase passes its gate.

## Important limitation
A prompt cannot technically guarantee that a coding AI never deviates. Stronger controls are the source-of-truth files, scoped tasks, diffs, automated tests, and human approval. Use this package as a governance system, not as proof that implementation is correct.
