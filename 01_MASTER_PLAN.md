# 1. MASTER PLAN — APPROVED PRODUCT REQUIREMENTS

## 1.1 Product objective
Build a project-based AI Studio application around four existing, distinct skills. The app must preserve each skill's original instructions, boundaries, input/output contracts, and validation behavior. A shared AI Provider & Model Manager routes requests but must not replace or reinterpret skill logic.

**Authority rule:** This plan is the approved baseline. No new feature, changed behavior, omitted requirement, or altered skill contract may be introduced without explicit user approval and an update to the decision register/changelog.

## 1.2 Four separate skills

### Skill A — Story-to-Script
Purpose: Analyze a user-supplied source and produce a fact-grounded script.
- Accept source material such as pasted text, article, URL, transcript, synopsis, story, research, history, biography, or business case, subject to actual reader/access capability.
- Validate that usable source content is available before generation.
- Analyze source facts and context; keep claims traceable to the source where possible.
- Choose the angle based on source type, plan story flow and duration/parts, and produce the script in the project's selected content language.
- Hindi script and voiceover use Devanagari; English selection uses English.
- Do not invent unsupported facts. If a URL cannot be read, report why and ask for pasted content.
- Validate structure, duration, and required fields; make targeted corrections only.
- Internal analysis is not shown as if it were the final script; show user-facing output as specified by the skill.
- Each part includes: Part Number, Type (Hook/Story/Ending), 8-second Hindi VO where applicable (language must follow project selection), visual suggestions, on-screen text.
- Preserve the original skill's full instructions as a protected contract; the summary here does not replace the original skill prompt.

### Skill B — Script-to-Video Prompt Engineering
Purpose: Convert an approved final script into detailed video-generation prompts for each part. It creates prompts, not actual videos.
- Input: current approved script and project settings.
- Analyze each part's action, facts, scene, timeline, camera, lighting, style, audio, continuity, and constraints.
- Preserve script meaning; do not invent unsupported events, people, or facts.
- Use saved Script Analysis when it is valid for the current script version; do not unnecessarily reanalyze.
- Validate each prompt and make targeted corrections.
- Respect project aspect ratio and voiceover/content language.
- Return prompt(s) and validation report according to the existing skill contract.

### Skill C — AI Thumbnail Intelligence Engine
Purpose: Produce **one complete image-generation prompt** for the project's thumbnail; it does not generate the image itself.
- Primary input is the entire current approved final script, not only the hook or individual parts.
- Analyze the whole topic/story and choose a strong but truthful angle.
- Specify subject, composition, background, lighting, style, and optional text when useful.
- Do not create misleading visual claims.
- Use the project's aspect ratio and selected thumbnail text language.
- Store one current thumbnail prompt per project; regenerate/revalidate when dependent inputs/settings become stale.

### Skill D — YouTube SEO Engine
Purpose: Create a project-aware SEO package using the source and script context.
- Use saved Source Analysis and Script Analysis where valid, plus current script and project ID/version.
- Check version/staleness; reconcile claims and stay truthful.
- Produce title, description, keywords, hashtags, and a separate comma-separated tags field.
- SEO output is **always Roman Hindi (Latin/English alphabet)** regardless of content language.
- Do not fabricate search volume, guarantee rankings, or add unsupported claims.
- Add disclosure only when warranted by the content/use case.
- Save outputs and status per project.

## 1.3 Project isolation and analysis reuse
Each project has a unique `project_id` and isolated data. Persist source/source versions, source analysis, current script and analysis, video prompts, thumbnail prompt, SEO package, project settings, statuses, and relevant execution metadata.
- Generate Source Analysis once per source version and reuse while valid.
- Generate Script Analysis once per current script version and reuse while valid.
- Video Prompt skill reuses valid Script Analysis.
- SEO reuses valid Source Analysis and Script Analysis.
- Reanalyze only if missing, invalid/stale, the underlying input changes, or the user explicitly requests re-analysis.
- Enforce isolation in database/application logic, not only in prompts.
- Store source version history.
- **Only the latest script is stored**: a new validated edit/regeneration replaces the prior saved script. Do not add script-history storage. Require approval again after any script edit/regeneration.
- If source changes, mark its analysis stale and mark dependent outputs stale.
- If script changes, mark Script Analysis, approval, video prompts, thumbnail prompt, and SEO stale as applicable.

## 1.4 Active project limit and deletion
- Maximum six active saved projects.
- Before creating a seventh project, identify the oldest by `created_at` and show the user a notice naming the project and asking for confirmation.
- If confirmed, delete that project and all linked project data, then create the new project with a fresh ID.
- If cancelled, retain all six and do not create the new project.
- Deletion is permanent within the app; no in-app restore.
- Exported ZIP files outside the app remain under the user's control.
- Use an atomic/recoverable operation: never delete the old project unless the new-project operation can complete safely. If the operation fails, do not leave the user with accidental data loss.
- Manual deletion also requires confirmation.
- Shared provider credentials/settings are not deleted when a project is deleted unless specifically project-scoped.

## 1.5 Project creation settings

### Aspect ratio
User chooses one at project creation:
- `9:16` portrait/vertical, target 1080×1920.
- `16:9` landscape, target 1920×1080.
Every generated video prompt and thumbnail prompt must explicitly respect the selected ratio. If the generation API has an aspect-ratio parameter, set it too. Validate for mismatch. A ratio change marks dependent outputs stale and requires revalidation/regeneration.

### Content language
User chooses:
- `Hindi`: script and voiceover in Hindi/Devanagari; thumbnail text in Hindi/Devanagari.
- `English`: script and voiceover in English; thumbnail text in English.
- Technical video prompt instructions may be English, but voiceover follows the project language.
- SEO is always Roman Hindi.
- Reopening a project restores settings; every new project asks again.
- Skills must not silently override project settings.

### Duration rules
For `9:16`, approved options are only:
| Total duration | Parts | Structure |
|---|---:|---|
| 24 sec | 3 | Hook + Story 1 + Ending |
| 32 sec | 4 | Hook + Story 1 + Story 2 + Ending |
| 40 sec | 5 | Hook + Story 1 + Story 2 + Story 3 + Ending |
| 48 sec | 6 | Hook + Story 1 + Story 2 + Story 3 + Story 4 + Ending |
| 56 sec | 7 | Hook + Story 1 + Story 2 + Story 3 + Story 4 + Story 5 + Ending |

Each vertical part is 8 seconds. Do not silently add 60 seconds or another option; it is not in the finalized vertical choices.

For `16:9`:
- Minimum duration is 3 minutes (180 seconds).
- User enters minutes; hours may be supported as an input convenience only if consistent with the same duration rule.
- No part may exceed 8 seconds; shorter parts are allowed.
- Aim to match total requested duration exactly where possible. Example: 180 seconds = 22×8 seconds + 1×4 seconds = 23 parts.
- Every part duration must be greater than 0 and no more than 8 seconds.

## 1.6 Source Adding Panel and script workflow
After creating a project and selecting settings, open a dedicated Source Adding Panel.
- Source type: supported choices can include pasted text, URL, article, transcript, subject to actual implementation.
- Fields: Source Title, Source URL (optional), Main Source Content.
- Actions: Save Source, Edit Source, Clear Unsaved Text.
- Status: Unsaved / Saved / Changes Not Saved / Validated / Failed or Unreadable.
- URL saved as a URL is not proof its content was fetched/read. If access fails, show a clear error and offer manual paste.
- Generate Script remains unavailable until source content is saved and validated.
- A meaningful source edit increments `source_version`, saves a new source version, and marks dependent analysis/outputs stale.

Workflow:
Create New Project → Select Aspect Ratio → Select Duration → Select Language → Save Settings → Source Adding Panel → Add/Edit Source → Save Source → Validate Source → Generate Script → Source Analysis → Facts/Context/Support → Plan Angle/Structure → Generate Script → Validate Script/Duration → Save Latest Script + Analysis → User Review/Approval.

Example source record:
```json
{
  "project_id": "project-unique-id",
  "source_id": "source-unique-id",
  "source_version": 1,
  "source_title": "User supplied title",
  "source_type": "pasted_text",
  "source_url": null,
  "source_content": "User's saved source content",
  "source_status": "saved",
  "analysis_status": "not_started"
}
```

## 1.7 Script review, editing, approval
- User reviews generated script.
- Editing/regenerating creates a replacement candidate; validate before overwriting the current saved script.
- Preserve the old saved script until the new candidate passes validation, then overwrite it (no history).
- Any edit/regeneration requires new approval.
- Downstream skill actions remain disabled until the current script is approved.
- Approval is tied to the exact script version/hash and relevant project settings.
- If the script or dependent settings change, approval becomes invalid.

## 1.8 AI Provider & Model Manager
The manager routes AI requests; it does not do the four skills' work and must not modify skill contracts.
- Multiple provider connections and keys may be configured if the corresponding adapters are implemented and tested.
- Candidate providers mentioned in the planning discussion: Google Gemini, OpenAI, Groq, OpenRouter, Mistral, NVIDIA, DeepSeek, and custom compatible providers. These are examples, not a claim that they are already supported.
- Only label a provider/model `Supported` after adapter implementation and testing.
- Common adapter concepts: validate connection, list models where supported, expose known capabilities, execute request, normalize errors, collect usage/quota only where exposed.
- Model catalog: use official model-list APIs when available; otherwise documented/static fallback marked with source and last checked. Unknown metadata stays `Unknown`; do not guess. Catalog presence does not guarantee account/region/key access.
- Routing checks provider connection, model availability, capability, required output format, and policy.
- Project has a preferred model and alternatives. On preferred model failure, notify user and request explicit permission before trying an alternative. **No silent model switching.**
- Respect provider rate-limit/reset guidance. Bounded retries for safe transient failures may retry the same model only where appropriate; do not loop.
- Do not blindly retry invalid keys, access/region/plan errors, billing errors, or model-not-found.
- Validate response schema before passing result to a skill.
- Record sanitized execution metadata and usage; never store secrets in logs.
- Project-level model choice takes precedence for that project. Do not introduce unapproved per-skill routing complexity.

## 1.9 Job, progress, retry
Status lifecycle: `Queued → Running → Validating → Completed`, or `Failed` / `Cancelled`.
- Show truthful progress/status; do not fabricate percentage or animate fake work.
- Job state should survive page reload if supported by the chosen architecture.
- Prevent duplicate Generate clicks/jobs for the same operation.
- On failure, show understandable reason and Retry action.
- Validate saved input/settings before retry.
- Keep prior saved outputs until a new result validates.
- Alternative model requires user permission.
- Treat timeouts carefully because the provider may have completed the request; avoid accidental duplicate expensive generation where possible.

## 1.10 Usage and history
Track requests and token counts per provider/model when available. Show actual cost only when supplied reliably; otherwise label `Estimate` or `Unknown`. Usage limits/warnings may be configurable. Actual provider quota/reset only when exposed by official endpoint/headers; otherwise `Unknown`.
Execution history includes project ID, skill ID, provider/model, timestamps, status, attempt, sanitized error, usage, and fallback reason. Do not log API keys or unnecessary sensitive prompt content.

## 1.11 Security, export, retention
- API keys stored encrypted server-side (e.g. AES-256-GCM) with master key outside the database in environment/secret manager.
- Frontend never receives full saved secret after initial submission; UI masks it.
- Never put keys in client bundle, URLs, logs, exported project ZIP, or ordinary project data.
- Use HTTPS, access control, redaction, rotation, and disconnect controls.
- Store only necessary project data; clean temporary files after tasks; execution-history retention is configurable.
- Project export is **data export only; no restore feature was approved**.
- Export ZIP contains source, latest script, approval status, video prompts, thumbnail prompt, SEO package, project settings, and JSON metadata. Exclude API keys/secrets.
- Project deletion permanently removes linked project data/cache/temp files. Shared credentials remain unless project-scoped.

## 1.12 Strict compliance and delivery
- No unapproved features, omissions, or changed behavior.
- If requirements conflict or technology cannot support a requirement, stop and ask the user; do not guess.
- Original skill instructions should be stored separately as protected, versioned contracts. The full original skill prompts were not included in the current conversation's files, so they must be imported from the user's authoritative source before claiming the exact original instructions are embedded.
- Run acceptance tests in `09_TEST_AND_ACCEPTANCE_MATRIX.md`.
- Do not mark a feature complete without evidence.
