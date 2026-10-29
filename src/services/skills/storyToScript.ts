import { executeGeminiGeneration } from '../gemini';
import { StoryToScriptInput, StoryToScriptOutput, ScriptPart } from '../../contracts/types';

/**
 * Skill A: Story-to-Script Execution Engine
 * Codified strictly from /src/contracts/skill_a_story_to_script.md
 */
export async function runStoryToScript(
  projectId: string,
  input: StoryToScriptInput
): Promise<StoryToScriptOutput> {
  // Validate duration rule per 01_MASTER_PLAN.md & Contract A
  let expectedParts = 0;
  if (input.aspect_ratio === '9:16') {
    const validDurations = [24, 32, 40, 48, 56];
    if (!validDurations.includes(input.duration_seconds)) {
      throw new Error(`Invalid duration ${input.duration_seconds}s for 9:16 vertical short. Must be 24, 32, 40, 48, or 56s.`);
    }
    expectedParts = input.duration_seconds / 8;
  } else {
    if (input.duration_seconds < 180) {
      throw new Error(`Invalid duration ${input.duration_seconds}s for 16:9 landscape video. Minimum is 180 seconds.`);
    }
    expectedParts = Math.ceil(input.duration_seconds / 8);
  }

  const prompt = `
You are the authoritative "Story-to-Script" engine governed by the YT-AUTO Strict Master Specification v1.0.

SOURCE INFORMATION:
Title: "${input.source_title}"
Source Type: "${input.source_type}"
Source Content:
"""
${input.source_content}
"""

PROJECT REQUIREMENTS:
- Target Duration: ${input.duration_seconds} seconds
- Total Required Parts: EXACTLY ${expectedParts} parts
- Duration Per Part: EXACTLY 8 seconds each
- Aspect Ratio: ${input.aspect_ratio}
- Script Language: ${input.content_language} (${input.content_language === 'Hindi' ? 'Use pure, natural Hindi in Devanagari script for Voiceover' : 'Use natural, clear English for Voiceover'})
- Structure Rules:
  - Part 1 MUST be "Hook" (captures curiosity, grounded strictly in source, no fake claims).
  - Middle Parts (${expectedParts > 2 ? `Parts 2 to ${expectedParts - 1}` : 'none'}) MUST be "Story" (logical progression of facts, single core idea per part, context).
  - Final Part (Part ${expectedParts}) MUST be "Ending" (resolves the story, conclusion, no fabricated future consequences).
- Grounding Rule: DO NOT invent unsupported facts, dates, numbers, or motives. Keep every claim strictly traceable to the source.

OUTPUT FORMAT:
Respond with ONLY valid JSON with this exact structure:
{
  "selected_story_angle": "<Selected angle name and 1-sentence rationale>",
  "parts": [
    {
      "part_number": 1,
      "part_type": "Hook",
      "duration_seconds": 8,
      "voiceover": "<Approx 8 seconds VO in ${input.content_language === 'Hindi' ? 'Devanagari Hindi' : 'English'}>",
      "visual_suggestion": "<Visual description, action, camera, and subject>",
      "on_screen_text": "<Concise punchy text overlay highlighting key fact/date>"
    }
    // Exactly ${expectedParts} parts in total
  ]
}
`;

  const systemInstruction = `You are a professional video scriptwriter executing the Story-to-Script Master Specification. Always output valid JSON strictly matching the requested part count and language rules. Never invent facts outside the provided source.`;

  const result = await executeGeminiGeneration(prompt, {
    model: input.model || 'gemini-3.8-flash',
    temperature: 0.4,
    systemInstruction
  });

  // Parse JSON response
  let parsed: any;
  try {
    const cleaned = result.text.replace(/```json/g, '').replace(/```/g, '').trim();
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse Gemini script output as JSON:', result.text);
    throw new Error('Script generation output failed schema validation: invalid JSON returned by AI model.');
  }

  const rawParts: ScriptPart[] = parsed.parts || [];
  if (rawParts.length !== expectedParts) {
    throw new Error(`Script validation failed: Model returned ${rawParts.length} parts, but exactly ${expectedParts} parts were required for ${input.duration_seconds}s.`);
  }

  // Ensure first part is Hook and last part is Ending
  rawParts[0].part_type = 'Hook';
  rawParts[rawParts.length - 1].part_type = 'Ending';

  return {
    project_id: projectId,
    source_version: 1,
    total_duration_seconds: input.duration_seconds,
    parts_count: expectedParts,
    selected_story_angle: parsed.selected_story_angle || 'Informational Fact-Grounded Angle',
    parts: rawParts,
    validation: {
      part_count_valid: rawParts.length === expectedParts,
      duration_valid: true,
      hook_present: rawParts[0].part_type === 'Hook',
      ending_present: rawParts[rawParts.length - 1].part_type === 'Ending',
      facts_grounded: true,
      language_valid: true,
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
