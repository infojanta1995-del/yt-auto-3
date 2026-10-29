# 15. GOOGLE AI STUDIO BOOTSTRAP PROMPT

Use this as the first instruction after adding the package files to the project/context. Do not ask the coding agent to build the entire app in one pass.

---

You are implementing an application governed by the attached `AI STUDIO STRICT MASTER PLAN PACKAGE`.

## Authority
Read `00_START_HERE.md`, `01_MASTER_PLAN.md`, `02_ARCHITECTURE_AND_DIAGRAMS.md`, `03_BUILD_STATUS_AND_TRACKER.md`, `04_STRICT_COMPLIANCE_RULES.md`, `05_SKILL_CONTRACTS.md`, `09_TEST_AND_ACCEPTANCE_MATRIX.md`, and `11_IMPLEMENTATION_ROADMAP.md` before proposing code changes.

The Master Plan is the approved source of truth. Do not add, remove, simplify, reinterpret, or change any requirement without explicit user approval. Do not silently substitute an easier implementation. If something is missing, contradictory, or technically blocked, identify it and stop for clarification.

## First task only: audit
Do NOT start implementing features yet.

1. Inspect the actual current project files, framework, database, auth, existing skill instructions, provider manager, tests, and deployment setup.
2. Report which requirements are already implemented, partially implemented, missing, or blocked. For every claimed implemented item, cite exact file paths and code locations and provide test evidence where available.
3. Identify whether the four exact original skill prompts are present. Do not reconstruct missing prompts.
4. Identify security issues, especially API key handling and project isolation.
5. Map current files to requirements and test IDs.
6. List the smallest safe next task and proposed files to change.
7. Do not edit files during this audit.
8. Do not claim tests passed unless you actually ran them and show the output.
9. Do not claim provider/model support without working adapter and test evidence.
10. Return the audit report in a structured format with:
   - Environment/repository summary
   - Verified implemented items (with evidence)
   - Partial items
   - Missing items
   - Blockers/unknowns
   - Security risks
   - Requirement/test mapping
   - Recommended next scoped task
   - Files that would be changed in that next task
   - Tests that would prove it works

Wait for user approval before beginning implementation.

## Scope enforcement
For every later task, implement only the exact task and requirement IDs the user approves. After changes, provide diffs and actual test outputs. Never begin the next roadmap phase until the current gate passes. No model switching without explicit user permission. No secrets in logs or exported files. Keep the four skills distinct.

Remember: a generated explanation or code snippet is not proof that the feature is implemented. Evidence is required.
