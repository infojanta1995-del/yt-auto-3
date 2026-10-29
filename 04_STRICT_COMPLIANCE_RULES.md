# 4. STRICT PLAN COMPLIANCE RULES

## Non-negotiable
The approved Master Plan and original skill contracts are the single source of truth. Implement exactly what is specified; do not optimize by changing requirements.

### Forbidden without explicit user approval
- Adding or removing product features.
- Changing workflow, UI behavior, field names/meaning, statuses, duration options, language rules, output schemas, storage rules, project limit, approval gates, provider fallback policy, or security behavior.
- Rewriting or simplifying any original skill instructions.
- Switching models without user permission.
- Claiming a provider/model, feature, test, or implementation is supported without evidence.
- Deleting project data without confirmation.
- Adding restore/version-history behavior that was not approved (script history and project restore are not approved).
- Inventing facts, metadata, quotas, prices, capabilities, or progress.
- Changing database schema or architecture outside the approved task scope.

### Required before code changes
1. Identify exact requirement IDs and roadmap phase.
2. Inspect current implementation and related files.
3. State proposed files to change and expected behavior.
4. Identify any conflict, unknown, or technical limitation.
5. If out-of-plan change is needed, stop and ask the user.

### Required after code changes
1. Summarize changed files and why.
2. Provide a diff or clear code changes.
3. Run relevant tests and include actual results.
4. Check regressions and all relevant acceptance criteria.
5. Update tracker/log with evidence.
6. Do not start next phase until current phase gate passes.

### Handling uncertainty
- Missing information: mark `BLOCKED` and ask.
- Conflicting requirements: cite both exact requirements and ask which one governs.
- Technical limitation: explain the constraint and propose the smallest plan-preserving option.
- Never silently guess, silently omit, or silently substitute.

### Practical caveat
These rules guide AI behavior but are not a technical guarantee by themselves. Enforce them with scoped commits/diffs, tests, code review, access controls, and user approval.
