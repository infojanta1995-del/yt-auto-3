# 13. OPEN ITEMS, BLOCKERS, AND NON-ASSUMPTIONS

## Known blockers
1. **Actual application codebase has not been audited in this conversation.** No claim is made that any app feature is already built.
2. **Exact original skill prompts are not included in the current planning materials.** They must be imported from the authoritative source. This package preserves agreed summaries but does not claim to contain the verbatim original instructions.
3. The actual framework, database, hosting, authentication, and deployment architecture are not established here. Inspect the existing app before selecting or replacing technology.
4. Provider availability, pricing, quota, model IDs, region/account eligibility, and capabilities are time-sensitive and must be verified at implementation time.
5. A ZIP package cannot automatically synchronize ChatGPT and Google AI Studio. The defined sync method is manual response/diff/test handoff.
6. Google AI Studio's exact capabilities and project access are not verified by this package; implementation must be tested in the actual environment.

## Rules for blockers
- Do not fill a blocker with invented details.
- Ask the user for the missing source or access.
- If a technical substitute is required, present the smallest plan-preserving alternative and wait for approval.
- Do not change approved product behavior just because an implementation path is inconvenient.

## No hidden assumptions
- No automatic provider fallback.
- No script history.
- No project restore.
- No promise that every listed provider is supported.
- No claim of real usage/cost/quota if the provider does not expose it.
- No claim of completed build without code and test evidence.
