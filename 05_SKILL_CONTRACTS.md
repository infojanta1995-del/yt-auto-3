# 5. FOUR SKILL CONTRACTS — KEEP DISTINCT

## Critical note
This file records the agreed behavior summaries, not the full original prompts. Import each exact original skill instruction from its authoritative source before implementation and store it separately, version-controlled and protected. Do not reconstruct missing text from memory or treat this summary as a replacement.

## Contract A — Story-to-Script
**Input:** saved and validated source + project settings (aspect ratio, duration, content language), project ID and source version.

**Behavior:** source analysis; factual grounding; angle selection; story flow/part plan; script generation; schema/duration validation; targeted corrections.

**Output requirements:** per part, Part Number; Type (Hook/Story/Ending); voiceover for the part (8 seconds for vertical; for landscape each part ≤8 seconds; language follows project); visual suggestions; on-screen text. Other fields must follow the original skill contract.

**Rules:** no unsupported facts; URL unreadable means fail clearly and request pasted content; store Source Analysis per source version and Script Analysis per current script version; do not expose internal analysis as final script unless original skill says so.

## Contract B — Script-to-Video Prompt Engineering
**Input:** current approved script, valid saved Script Analysis, project settings.

**Output:** detailed prompt for every script part, not a generated video; include relevant action, timeline, scene, camera, lighting, style, audio, continuity, constraints, ratio, and validation report as specified by original prompt.

**Rules:** preserve script facts and meaning; no unsupported scenes/characters; reuse valid Script Analysis; voiceover language follows project language; aspect ratio must match project setting.

## Contract C — AI Thumbnail Intelligence Engine
**Input:** entire current approved script and project settings.

**Output:** one complete image-generation prompt, not an image.

**Rules:** analyze the whole script, not only the hook; truthful visual angle; subject/composition/background/lighting/style/optional text; project ratio and text language; save one current prompt per project.

## Contract D — YouTube SEO Engine
**Input:** project ID, current source/script, valid Source Analysis and Script Analysis, project versions/settings.

**Output:** title, description, keywords, hashtags, and separate comma-separated tags.

**Rules:** SEO always Roman Hindi (Latin alphabet), regardless of script language; truth over SEO; no fabricated search-volume data or ranking promises; disclosure only when warranted; project/version/staleness checks.

## Shared execution contract
- Skill manager is responsible for invoking the selected configured provider/model and returning normalized output.
- Provider/model manager must not author the skill's substantive result or change skill instructions.
- Validate output schema before saving.
- Keep each skill's status and output isolated by project.
- Downstream skills require current script approval.
- Model/provider changes do not bypass skill validation.
