/**
 * YT-AUTO Strict Skill Contracts & Schemas
 * Directly codified from frozen authoritative specifications:
 * - Skill A: skill_a_story_to_script.md
 * - Skill B: skill_b_script_to_video.md
 * - Skill C: skill_c_thumbnail_engine.md
 * - Skill D: skill_d_youtube_seo.md
 */

// ==========================================
// SKILL A: STORY-TO-SCRIPT CONTRACT
// ==========================================
export interface StoryToScriptInput {
  source_content: string;
  source_title: string;
  source_type: 'news' | 'documentary' | 'film' | 'history' | 'science' | 'technology' | 'research' | 'biography' | 'business' | 'educational' | 'pasted_text';
  duration_seconds: number; // 24, 32, 40, 48, 56 for 9:16; >=180 for 16:9
  content_language: 'Hindi' | 'English';
  aspect_ratio: '9:16' | '16:9';
  model?: string;
}

export interface ScriptPart {
  part_number: number;
  part_type: 'Hook' | 'Story' | 'Ending';
  duration_seconds: number; // exactly 8s for 9:16; <=8s for 16:9
  voiceover: string; // Devanagari Hindi or English per project setting
  visual_suggestion: string;
  on_screen_text: string;
}

export interface ExecutionMetadata {
  model: string;
  latency_ms: number;
  prompt_tokens?: number;
  response_tokens?: number;
  total_tokens?: number;
  generation_source: 'ai_generated' | 'operator_edited' | 'sample_seed' | 'mock_fallback';
  generated_at?: string;
}

export interface StoryToScriptOutput {
  project_id: string;
  source_version: number;
  total_duration_seconds: number;
  parts_count: number;
  selected_story_angle: string;
  parts: ScriptPart[];
  validation: {
    part_count_valid: boolean;
    duration_valid: boolean;
    hook_present: boolean;
    ending_present: boolean;
    facts_grounded: boolean;
    language_valid: boolean;
    status: 'PASS' | 'PASS_WITH_WARNINGS' | 'NEEDS_REVISION';
    notes?: string[];
  };
  execution_metadata?: ExecutionMetadata;
}

// ==========================================
// SKILL B: SCRIPT-TO-VIDEO PROMPT CONTRACT
// ==========================================
export interface ScriptToVideoInput {
  project_id: string;
  aspect_ratio: '9:16' | '16:9';
  clip_duration_seconds: number; // 8 seconds standard
  script_parts: ScriptPart[];
  visual_style?: string; // Cinematic Space Documentary, Realistic, etc.
  narrator_gender?: 'Male' | 'Female';
  model?: string;
}

export interface VideoClipPrompt {
  part_number: number;
  scene_purpose: string;
  video_specifications: {
    aspect_ratio: string;
    duration: string;
    style: string;
    orientation: 'Portrait' | 'Landscape';
  };
  scene_description: {
    main_subject: string;
    environment: string;
    main_action: string;
    supporting_elements: string;
  };
  timeline: {
    time_0_to_2s: string;
    time_2_to_5s: string;
    time_5_to_7s: string;
    ending_frame: string;
  };
  camera_direction: {
    shot_type: string;
    movement: string;
    framing: string;
    focus: string;
  };
  lighting_and_color: {
    lighting: string;
    color_palette: string;
    mood: string;
    treatment: string;
  };
  audio_direction: {
    exact_voiceover: string;
    narrator_characteristics: string;
    background_music: string;
    sound_effects: string;
  };
  continuity_rules: string;
  constraints: string[];
  final_generation_instruction: string;
}

export interface ScriptToVideoOutput {
  project_id: string;
  clip_prompts: VideoClipPrompt[];
  validation_report: {
    script_fidelity: 'PASS' | 'FAIL';
    format_compliance: 'PASS' | 'FAIL';
    temporal_feasibility: 'PASS' | 'FAIL';
    continuity_status: 'PASS' | 'FAIL';
    status: 'PASS' | 'PASS_WITH_WARNINGS' | 'NEEDS_REVISION';
  };
  execution_metadata?: ExecutionMetadata;
}

// ==========================================
// SKILL C: AI THUMBNAIL INTELLIGENCE CONTRACT
// ==========================================
export interface ThumbnailIntelligenceInput {
  project_id: string;
  aspect_ratio: '9:16' | '16:9';
  entire_script_parts: ScriptPart[];
  content_language: 'Hindi' | 'English';
  model?: string;
}

export interface ThumbnailIntelligenceOutput {
  project_id: string;
  selected_thumbnail_angle: string;
  main_subject: string;
  main_visual_action: string;
  supporting_elements: string;
  background: string;
  composition: string;
  camera_perspective: string;
  lighting: string;
  color_palette: string;
  mood: string;
  visual_style: string;
  thumbnail_text: {
    text: string;
    placement: string;
    language: string;
  };
  aspect_ratio: string;
  final_thumbnail_generation_prompt: string;
  validation: {
    whole_script_grounded: boolean;
    misleading_claims_avoided: boolean;
    aspect_ratio_match: boolean;
    status: 'PASS' | 'PASS_WITH_WARNINGS';
  };
  execution_metadata?: ExecutionMetadata;
}

// ==========================================
// SKILL D: YOUTUBE SEO ENGINE CONTRACT
// ==========================================
export interface YouTubeSeoInput {
  project_id: string;
  source_title: string;
  source_content: string;
  current_script_parts: ScriptPart[];
  model?: string;
}

export interface YouTubeSeoOutput {
  project_id: string;
  title: string; // Recommended YouTube Title (Roman Hindi / Latin alphabet)
  description: {
    opening_hook: string;
    main_context: string;
    main_explanation: string;
    final_takeaway: string;
    disclaimer: string;
    formatted_full_description: string;
  };
  primary_keywords: string[];
  secondary_keywords: string[];
  hashtags: string[]; // Formatted with # prefix
  tags: string[]; // Comma-separated YouTube Studio tags
  tags_comma_separated: string;
  validation: {
    project_isolated: boolean;
    roman_hindi_enforced: boolean;
    facts_grounded: boolean;
    status: 'PASS' | 'PASS_WITH_WARNINGS';
    notes?: string[];
  };
  execution_metadata?: ExecutionMetadata;
}

// ==========================================
// SOURCE & SCRIPT ANALYSIS LIFECYCLE (MASTER PLAN §1.3 & §6.2)
// ==========================================
export interface SourceAnalysisRecord {
  analysis_id: string;
  project_id: string;
  source_id: string;
  source_version: number;
  detected_topic: string;
  key_facts: string[];
  core_entities: string[];
  narrative_angle_recommendation: string;
  fact_traceability_notes: string;
  status: 'valid' | 'stale';
  analyzed_at: string;
}

export interface ScriptAnalysisRecord {
  analysis_id: string;
  project_id: string;
  script_version: number;
  script_hash: string;
  pacing_breakdown: Array<{
    part_number: number;
    seconds: number;
    emotional_tone: string;
    pacing_rating: 'fast' | 'measured' | 'climactic';
  }>;
  continuity_rules: string[];
  visual_motifs: string[];
  audio_atmosphere: string;
  status: 'valid' | 'stale';
  analyzed_at: string;
}

