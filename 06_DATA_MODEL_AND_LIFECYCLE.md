# 6. DATA MODEL AND LIFECYCLE

## Logical entities
These are logical requirements, not a mandate to use a particular database technology. Inspect the existing codebase before choosing or changing implementation details.

### Project
- `project_id` unique
- `name` / display title
- `created_at`, `updated_at`
- `aspect_ratio` = `9:16` or `16:9`
- `content_language` = `Hindi` or `English`
- duration settings appropriate to ratio
- project preferred model and configured alternatives
- current source ID/version
- current script ID/version/hash and approval state
- per-skill output status/version
- project status

### Source
- `source_id`, `project_id`, `source_version`
- title, type, URL if present, content
- save/validation status and timestamps
- source analysis version/status/hash
- preserve old source versions

### Script
- current script content, script version/hash, analysis, validation status
- approval state tied to current script hash/settings
- only latest script is persisted; no script history
- use a validated replacement candidate before overwriting current saved script

### SkillOutput
- project ID, skill ID, input script/source version/hash
- output content and schema version
- status, timestamps, validation result
- stale/current marker

### Provider / Model
- provider definition and connection metadata
- secret reference (never raw secret in project records)
- model catalog and known capabilities
- project preferred model and alternatives
- fallback permission request state

### AIExecution
- execution/correlation ID, project ID, skill ID
- provider/model, status, attempt count, timestamps
- sanitized error, usage and fallback reason
- no secrets; avoid unnecessary prompt content

## Staleness rules
| Change | Mark stale / require action |
|---|---|
| Source content changes | new source version; source analysis stale; dependent script/output needs regeneration/review |
| Project aspect ratio changes | video and thumbnail prompts stale; revalidate/regenerate |
| Content language changes | script/voiceover/thumbnail text may be stale; SEO remains Roman Hindi; require appropriate regeneration/review |
| Duration changes | script/part plan and video prompts stale |
| Script edit/regeneration | replace latest script only after validation; invalidate approval, Script Analysis and downstream outputs |
| Model/provider changes | do not change skill contract; log config/execution; validate result |
| Project deleted | permanently delete all linked project data/cache/temp files after confirmation |

## Project limit algorithm
1. Count active saved projects.
2. If fewer than six, create project.
3. If six, identify oldest `created_at` and show clear warning.
4. On cancel, do nothing.
5. On confirm, perform safe atomic/recoverable deletion-and-creation.
6. Verify successful creation and deletion result; on failure, preserve/recover existing project and report error.

## Source analysis reuse
- Key analysis to `project_id + source_id + source_version + analysis_schema_version`.
- Reuse only when status valid and hash/version matches.
- Source changes invalidate it.
- Explicit reanalysis may create a fresh analysis record for the current source version, but must not delete the source version history.

## Script analysis reuse
- Key to `project_id + current_script_hash/version + analysis_schema_version`.
- Reuse only if valid and current.
- On new script, mark prior analysis stale; keep only the current script record per approved storage rule.

## Export ZIP
Include: source and its current/version data as specified, latest script, approval status, video prompts, thumbnail prompt, SEO package, project settings, and JSON metadata. Never include provider keys or secrets. Export is data export only; no app restore feature was approved.
