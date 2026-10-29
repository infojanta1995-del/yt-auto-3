# 9. TEST AND ACCEPTANCE MATRIX

## Gate rule
A requirement can be `DONE` only when implementation evidence and applicable test results are supplied. Test IDs below should be referenced in pull requests/tasks and the progress tracker.

| Test ID | Requirement / scenario | Expected result |
|---|---|---|
| T-001 | Project IDs | Each project has unique ID; no cross-project data leakage |
| T-002 | Project cap below six | New project creates normally |
| T-003 | Seventh project | Oldest project identified; confirmation required |
| T-004 | Seventh project cancelled | No deletion and no new project |
| T-005 | Seventh project confirmed | Safe atomic/recoverable deletion and new project creation |
| T-006 | Manual project deletion | Confirmation; linked project data removed; shared credentials retained |
| T-007 | 9:16 duration choices | Only 24/32/40/48/56 seconds |
| T-008 | 9:16 part mapping | Exact 8-second parts and Hook/Story/Ending mapping |
| T-009 | 16:9 minimum | Reject less than 180 seconds |
| T-010 | 16:9 part length | Every part >0 and ≤8 seconds; total matches requested duration where possible |
| T-011 | Project language | Hindi script/VO/thumbnail text in Devanagari; English in English |
| T-012 | SEO language | Roman Hindi regardless of project content language |
| T-013 | URL unreadable | Clear error and paste-content option; no false claim source read |
| T-014 | Source edit | New source version; analysis/dependent outputs marked stale |
| T-015 | Source analysis reuse | Reuse valid analysis for unchanged source |
| T-016 | Script validation failure | Current saved script preserved |
| T-017 | Script replacement | New script overwrites only after validation; no history retained |
| T-018 | Script approval | Edit/regeneration invalidates approval |
| T-019 | Downstream gate | Video/thumbnail/SEO disabled until current script approved |
| T-020 | Video prompt skill | Prompt per script part; ratio/facts/continuity checked; no video claimed generated |
| T-021 | Thumbnail skill | Exactly one prompt grounded in entire script; does not claim to generate image |
| T-022 | SEO output | Title, description, keywords, hashtags, comma-separated tags; Roman Hindi |
| T-023 | Provider adapter | Supported status only after tests; unsupported capability shown honestly |
| T-024 | Key storage | Secrets encrypted backend-side and absent from logs/client bundle/export |
| T-025 | Preferred model success | Uses configured project model |
| T-026 | Preferred model failure | No alternative model used without explicit permission |
| T-027 | Retry policy | Bounded; no infinite loops; error-specific handling |
| T-028 | Schema invalid output | Reject/fix or report failure; do not save as completed |
| T-029 | Progress states | Real states only; duplicate Generate clicks prevented |
| T-030 | Usage/cost | Unknown/Estimate displayed where actual data unavailable |
| T-031 | Export ZIP | Required project data included; API keys excluded |
| T-032 | Temporary cleanup | Temporary data cleaned according to retention policy |
| T-033 | Skill isolation | Each skill follows its own original instructions and output schema |
| T-034 | Plan compliance | No unapproved feature or behavior added |
| T-035 | Regression | Existing approved tests remain passing after changes |

## Evidence required for each test
- Test ID and requirement.
- Environment/commit/version.
- Exact command or test procedure.
- Actual output/result.
- Relevant screenshot or diff when UI behavior is involved.
- Reviewer decision: PASS / FAIL / BLOCKED.
