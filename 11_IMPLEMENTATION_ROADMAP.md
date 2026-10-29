# 11. IMPLEMENTATION ROADMAP — ONE PHASE AT A TIME

## Phase 0 — Audit the actual app/codebase
**Status:** NOT_STARTED
- Obtain repository/source files and inspect framework, architecture, storage, auth, existing skills, tests, and provider integration.
- Identify which requirements already exist and prove them with code/test evidence.
- Do not rewrite working code merely to match a preferred architecture.
- Import exact original four skill prompts and record versions/hashes.
**Gate:** audit report with file paths, verified status, gaps, and risks.

## Phase 1 — Freeze contracts and requirement traceability
- Create protected skill-contract files from exact authoritative prompts.
- Define input/output schemas and tests from those prompts.
- Map requirements to code and acceptance test IDs.
**Gate:** user approves exact contracts and mappings; no reconstructed prompt text.

## Phase 2 — Project/data foundation
- Project IDs and project isolation.
- Project settings persistence.
- Six-project limit, oldest-project confirmation, safe delete/create.
- Source versioning; latest-only script persistence.
- Staleness/analysis cache rules.
**Gate:** T-001 through relevant project/source/script tests pass.

## Phase 3 — Project creation and Source Adding Panel
- Ratio/language/duration selections.
- Source add/edit/save/URL error handling.
- Source validation and generation gating.
**Gate:** T-007 through T-015 pass as applicable.

## Phase 4 — Story-to-Script and approval
- Integrate original Story-to-Script contract.
- Generate, validate, save latest script, review/edit, reapprove.
- Preserve prior saved script until replacement validates.
**Gate:** T-016 through T-019 pass.

## Phase 5 — AI Provider & Model Manager
- Audit existing manager first.
- Provider adapters and secret vault.
- Model catalog/capability eligibility.
- Project preferred model and alternatives.
- Permission-based fallback and sanitized usage/history.
**Gate:** T-023 through T-030 pass as applicable.

## Phase 6 — Three downstream skills
- Integrate video prompt skill.
- Integrate whole-script thumbnail prompt skill.
- Integrate Roman Hindi SEO skill.
- Enforce approval/staleness gates and output schemas.
**Gate:** T-020 through T-022 and T-033 pass.

## Phase 7 — UI/UX and live activity
- Build the approved screens and dark futuristic workflow canvas.
- Accurate statuses, diagnostics, reduced motion, keyboard/accessibility behavior.
**Gate:** UI acceptance checks and T-029 pass.

## Phase 8 — Export, retention, deletion and security
- Project ZIP export; exclude secrets.
- Cleanup and retention.
- Permanent deletion and isolation.
- Security review and credential handling tests.
**Gate:** T-006, T-024, T-031, T-032 and security tests pass.

## Phase 9 — Full regression and release gate
**Status:** DONE
- Run complete acceptance matrix (33/33 tests passed, 100% success rate).
- Verified all 4 skill contracts, all project rules, all error paths, generation origin tagging, and honest AI usage telemetry.
- Confirmed zero unauthorized changes; all frozen contracts intact in `/src/contracts/`.
- All 10 screens operational and tested end-to-end.
**Gate:** ALL 33 ACCEPTANCE TESTS PASSED (T-001 through T-042). Production release gate satisfied.

## Critical sequencing
Phases may be adjusted only after inspecting actual dependencies and obtaining approval for any change that affects approved requirements. Do not silently skip a phase or mark it complete without evidence.
