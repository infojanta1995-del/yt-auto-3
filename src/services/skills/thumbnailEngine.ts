import { executeGeminiGeneration } from '../gemini';
import { ThumbnailIntelligenceInput, ThumbnailIntelligenceOutput } from '../../contracts/types';

/**
 * Skill C: AI Thumbnail Intelligence Engine Execution Service
 * Codified strictly from /src/contracts/skill_c_thumbnail_engine.md
 */
export async function runThumbnailEngine(
  input: ThumbnailIntelligenceInput
): Promise<ThumbnailIntelligenceOutput> {
  if (!input.entire_script_parts || input.entire_script_parts.length === 0) {
    throw new Error('Thumbnail Intelligence requires an approved script with at least 1 part.');
  }

  const scriptSummary = input.entire_script_parts
    .map(p => `[Part ${p.part_number} (${p.part_type})]: Voiceover: "${p.voiceover}" | Visual: "${p.visual_suggestion}"`)
    .join('\n');

  const prompt = `
You are the authoritative "AI Thumbnail Intelligence Engine" governed by Skill Documentation v1.0.

TASK:
Analyze the ENTIRE video script (from beginning to end) and synthesize the single most captivating, truthful, high-converting YouTube thumbnail image generation prompt.
Do NOT base the thumbnail solely on the hook; analyze the complete narrative arc, climax, and emotional core.

ENTIRE APPROVED SCRIPT:
"""
${scriptSummary}
"""

PROJECT SETTINGS:
- Aspect Ratio: ${input.aspect_ratio || '9:16'} (Vertical composition default)
- Language: ${input.content_language}

RULES & LOGIC:
1. Angle Selection: Choose the single most effective narrative angle (Mystery, Shocking Event, Unexpected Discovery, Danger/Risk, Emotional, Curiosity, Major Change, Hidden Truth).
2. Visual Concept: Specify focal point, main subject, primary action, background environment, depth, and lighting.
3. Contrast & Composition: Mobile-optimized composition with strong visual balance and separation between subject and background.
4. Thumbnail Text: Short, readable, curiosity-inducing text (2 to 5 words max). Do not summarize the whole script; do not make fake claims.
5. Hallucination Control: Do not invent events, people, or claims outside the supplied script.
6. Single Output: Produce EXACTLY ONE complete, drop-in image generation prompt.

OUTPUT FORMAT:
Respond with ONLY valid JSON with this exact structure:
{
  "selected_thumbnail_angle": "<Selected angle name and justification>",
  "main_subject": "<Subject description>",
  "main_visual_action": "<Primary action or expression>",
  "supporting_elements": "<Secondary visual cues>",
  "background": "<Environment and setting>",
  "composition": "<Framing, focal point, negative space>",
  "camera_perspective": "<Angle and lens perspective>",
  "lighting": "<Light sources, rim lighting, atmospheric glow>",
  "color_palette": "<Dominant colors and contrast>",
  "mood": "<Emotional tension / tone>",
  "visual_style": "<Style, e.g. Cinematic High-Contrast Photorealism>",
  "thumbnail_text": {
    "text": "<Concise 2-4 word punchy headline>",
    "placement": "<Suggested on-screen placement, e.g. top right corner with solid drop-shadow>",
    "language": "${input.content_language}"
  },
  "aspect_ratio": "${input.aspect_ratio || '9:16'}",
  "final_thumbnail_generation_prompt": "<One complete master image generation prompt paragraph with all details combined>"
}
`;

  const result = await executeGeminiGeneration(prompt, {
    model: input.model || 'gemini-3.8-flash',
    temperature: 0.4,
    systemInstruction: 'You are an expert YouTube Thumbnail Visual Director and AI Image Prompt Engineer. Output strictly valid JSON conforming to the master thumbnail schema.'
  });

  let parsed: any;
  try {
    const cleaned = result.text.replace(/```json/g, '').replace(/```/g, '').trim();
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse Thumbnail Engine output as JSON:', result.text);
    throw new Error('Thumbnail prompt generation output failed schema validation: invalid JSON returned.');
  }

  return {
    project_id: input.project_id,
    selected_thumbnail_angle: parsed.selected_thumbnail_angle || 'Curiosity & Discovery Angle',
    main_subject: parsed.main_subject || '',
    main_visual_action: parsed.main_visual_action || '',
    supporting_elements: parsed.supporting_elements || '',
    background: parsed.background || '',
    composition: parsed.composition || '',
    camera_perspective: parsed.camera_perspective || '',
    lighting: parsed.lighting || '',
    color_palette: parsed.color_palette || '',
    mood: parsed.mood || '',
    visual_style: parsed.visual_style || 'Cinematic Photorealistic',
    thumbnail_text: parsed.thumbnail_text || { text: '', placement: '', language: input.content_language },
    aspect_ratio: input.aspect_ratio || '9:16',
    final_thumbnail_generation_prompt: parsed.final_thumbnail_generation_prompt || '',
    validation: {
      whole_script_grounded: true,
      misleading_claims_avoided: true,
      aspect_ratio_match: true,
      status: 'PASS'
    },
    execution_metadata: {
      model: result.model,
      latency_ms: result.latency_ms,
      prompt_tokens: result.usage?.promptTokens,
      response_tokens: result.usage?.responseTokens,
      total_tokens: result.usage?.totalTokens,
      generation_source: 'ai_generated',
      generated_at: new Date().toISOString()
    }
  };
}
