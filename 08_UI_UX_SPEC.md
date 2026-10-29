# 8. UI / UX SPECIFICATION

## Approved visual direction
**Dark Futuristic + Live Animated Workflow Canvas + Modular Workspace** — “Next-Generation AI Command Center”.
- Deep charcoal base; restrained cyan/violet highlights; subtle glass panels; readable typography.
- Responsive layouts.
- Live workflow nodes and animated connections; animation must reflect real execution states, never fake progress.
- Status indicators for queued/running/validating/completed/failed/cancelled.
- Click a node to inspect input, status, configured model, output, and sanitized diagnostics.
- Disable downstream skills until current script approval.
- Include reduced-motion support, keyboard shortcuts, searchable projects, expandable diagnostics.

## Screens
1. Dashboard
2. New Project
3. Project Workspace
4. Source Workspace / Source Adding Panel
5. Script Studio
6. Skill Control Center
7. AI Model Center
8. Live Activity Center
9. Usage & History
10. Project Settings

## Dashboard
- Searchable project list.
- Current status and recent activity.
- Create New Project.
- Project count and six-project limit.
- Do not show fabricated stats or false “completed” statuses.

## New Project
1. Choose aspect ratio.
2. Choose duration according to aspect-ratio rules.
3. Choose content language.
4. Save settings and create project.
5. Open Source Adding Panel.

## Source Adding Panel
Fields:
- Source Type
- Source Title
- Source URL (optional)
- Main Source Content

Actions:
- Save Source
- Edit Source
- Clear Unsaved Text
- Generate Script (disabled until saved source content is validated)

Status labels: Unsaved, Saved, Changes Not Saved, Validated, Failed/Unreadable.
Warn if URL is stored but its content has not actually been fetched/read.

## Script Studio
- Display current generated script and validation state.
- Allow user edit/regeneration.
- Validate candidate before replacing saved script.
- Reapproval required after edits/regeneration.
- Keep old saved script until new candidate validates, then overwrite; no script history.
- Downstream skill controls disabled until approved.

## Skill Control Center
Separate cards/actions for:
- Story-to-Script
- Script-to-Video Prompt Engineering
- AI Thumbnail Intelligence Engine
- YouTube SEO Engine
Show status, inputs, output, validation, and run history. Do not merge skill responsibilities.

## AI Model Center
Provider connection management, model catalog, project preferred model and alternatives, connection test, usage and sanitized errors. No silent model fallback.

## Live Activity Center
Show actual queued/running/validating/completed/failed/cancelled states, retry action, and truthful progress. Prevent duplicate submissions.

## Usage & History
Project/provider/model filters, timestamps, usage, known cost or Estimate/Unknown, sanitized errors, fallback permission history.

## Project Settings
Aspect ratio, language, duration, preferred model, alternatives, and relevant retention settings. Warn when a change invalidates dependent outputs.
