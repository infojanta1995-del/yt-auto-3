# 12. FINAL DECISION REGISTER

These decisions are recorded from the planning conversation summary. If an item conflicts with the user's authoritative original skill prompt, stop and ask rather than silently rewriting either source.

| ID | Final decision |
|---|---|
| D-001 | Four skills remain separate; original instructions and output contracts protected |
| D-002 | Each project has isolated data and a unique project ID |
| D-003 | Source analysis reused while source version and analysis remain valid |
| D-004 | Script analysis reused while current script version/hash remains valid |
| D-005 | Maximum six active saved projects |
| D-006 | On seventh project, identify oldest and ask before permanent deletion |
| D-007 | Cancel deletion means no deletion and no new project |
| D-008 | Project deletion removes linked data; no in-app restore |
| D-009 | Export project data as ZIP only; no restore function approved |
| D-010 | Export includes source, latest script, approval status, video prompts, thumbnail prompt, SEO, settings, JSON metadata; excludes secrets |
| D-011 | Source versions preserved |
| D-012 | Only latest script persisted; no script history |
| D-013 | New/edit/regenerated script must validate before replacing saved script and requires approval again |
| D-014 | Downstream skills disabled until current script approved |
| D-015 | Project creation asks aspect ratio, duration, content language |
| D-016 | 9:16 choices: 24/32/40/48/56 seconds, 8 seconds per part |
| D-017 | 16:9 minimum 180 seconds; each part >0 and ≤8 seconds; shorter final part allowed |
| D-018 | Hindi script/voiceover/thumbnail text in Devanagari; English selection in English |
| D-019 | SEO always Roman Hindi, regardless of content language |
| D-020 | Dedicated Source Adding Panel after project setup |
| D-021 | Unreadable URL must report issue and allow pasted content; never pretend it was read |
| D-022 | Video prompt skill produces prompts, not videos |
| D-023 | Thumbnail skill produces one prompt from the entire script, not an image |
| D-024 | Project-level preferred model and alternatives |
| D-025 | Model fallback requires explicit user permission; no silent switching |
| D-026 | Provider support only claimed after adapter implementation/testing |
| D-027 | Track usage/cost honestly; unknown data shown as Unknown/Estimate |
| D-028 | Job statuses: Queued, Running, Validating, Completed, Failed, Cancelled |
| D-029 | Retry after validating input/settings; avoid duplicate jobs and infinite loops |
| D-030 | API keys encrypted backend-side, masked, excluded from logs/URLs/export |
| D-031 | Temporary files cleaned; execution-history retention configurable |
| D-032 | Dark Futuristic + Live Animated Workflow Canvas + Modular Workspace UI |
| D-033 | Build and verify one implementation phase at a time |
| D-034 | No unapproved changes; ambiguity/technical limitation requires asking user |
| D-035 | Manual handoff: paste Google AI Studio response into ChatGPT for compliance review |
| D-036 | Four skill prompts provided by user; verbatim specifications frozen in /src/contracts/ (RESOLVED) |
| D-037 | Technology Stack: Node.js 22 + TypeScript + Express + React + Tailwind CSS, Port 3000, Host 0.0.0.0 (APPROVED) |
| D-038 | Persistence: Firebase Firestore, subject to verification (APPROVED) |
| D-039 | Initial AI Provider: Google Gemini via @google/genai SDK (APPROVED) |
| D-040 | Firestore Architecture: Server-Side Express Proxy (APPROVED) |
| D-041 | Workspace Model: Choice 2 (Authenticated multi-user workspace, strict per-user isolation, 6 projects per user) (APPROVED) |

## Change request template
```text
CHANGE REQUEST ID:
Affected decision/requirement:
Current approved behavior:
Requested change:
Reason:
Impact on UI/data/skills/security/tests:
User approval: PENDING / APPROVED / REJECTED
Master plan version updated:
```
