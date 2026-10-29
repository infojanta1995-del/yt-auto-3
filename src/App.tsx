import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Terminal, 
  Cpu, 
  Film, 
  Image, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Trash2, 
  Download, 
  Layers, 
  FileText, 
  Sparkles, 
  Database, 
  Lock, 
  RefreshCw, 
  Sliders, 
  Users, 
  ChevronRight,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
  Unlock,
  Edit3,
  Play,
  Zap,
  X,
  Activity,
  BarChart3,
  Settings,
  Eye,
  ShieldCheck,
  History,
  RotateCcw,
  Archive
} from 'lucide-react';

interface Project {
  project_id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  aspect_ratio: '9:16' | '16:9';
  content_language: 'Hindi' | 'English';
  duration_seconds: number;
  parts_count: number;
  project_status: string;
  preferred_model: string;
  alternative_models: string[];
  current_source_id?: string;
  current_source_version?: number;
  retention_policy?: 'indefinite' | 'auto_cleanup_30d' | 'auto_cleanup_7d';
  auto_cleanup_temp_files?: boolean;
  script_approved: boolean;
}

interface SourceRecord {
  source_id: string;
  project_id: string;
  source_version: number;
  source_title: string;
  source_type: string;
  source_url?: string;
  source_content: string;
  source_status: string;
  validation_error?: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  user_id: string;
  project_id?: string;
  timestamp: string;
  action: string;
  level: 'info' | 'warn' | 'error' | 'security';
  details: string;
}

export function GenerationBadge({ 
  source, 
  model, 
  latency, 
  tokens,
  latencyMs,
  tokensUsed
}: { 
  source?: string; 
  model?: string; 
  latency?: number; 
  tokens?: number;
  latencyMs?: number;
  tokensUsed?: number;
}) {
  const effectiveLatency = latency ?? latencyMs;
  const effectiveTokens = tokens ?? tokensUsed;

  if (source === 'ai_generated') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/50">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>Real AI Generation • {model || 'Google Gemini'}</span>
        {effectiveTokens ? <span className="text-emerald-400/80 font-mono text-[10px]">({effectiveTokens.toLocaleString()} tokens{effectiveLatency ? `, ${effectiveLatency}ms` : ''})</span> : null}
      </span>
    );
  }
  if (source === 'operator_edited') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950/50">
        <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
        <span>Operator Edited Candidate • Human Review Verified</span>
      </span>
    );
  }
  if (source === 'sample_seed') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
        <span>Demonstration Sample Data</span>
      </span>
    );
  }
  if (source === 'mock_fallback') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-950/50">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        <span>Verified High-Fidelity Fallback • Offline/Demo Mode</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800">
      <span>Awaiting Generation</span>
    </span>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<string>('creator_master_01');
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'canvas' | 'source' | 'script' | 'skills' | 'models' | 'usage' | 'activity' | 'governance' | 'settings'>('dashboard');
  const [loading, setLoading] = useState<boolean>(true);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // Usage & History states (Screen 9 / T-026 / T-030)
  const [executions, setExecutions] = useState<any[]>([]);
  const [usageSummary, setUsageSummary] = useState<any>(null);
  const [usageLoading, setUsageLoading] = useState<boolean>(false);
  const [usageFilterSkill, setUsageFilterSkill] = useState<string>('all');
  const [usageFilterStatus, setUsageFilterStatus] = useState<string>('all');
  const [pendingFallbackRequest, setPendingFallbackRequest] = useState<any>(null);
  const [fallbackProcessing, setFallbackProcessing] = useState<boolean>(false);

  // Project Settings & Retention states (Screen 10 / 08_UI_UX_SPEC.md §10)
  const [settingsName, setSettingsName] = useState<string>('');
  const [settingsRatio, setSettingsRatio] = useState<'9:16' | '16:9'>('9:16');
  const [settingsLanguage, setSettingsLanguage] = useState<'Hindi' | 'English'>('Hindi');
  const [settingsDuration, setSettingsDuration] = useState<number>(32);
  const [settingsPreferredModel, setSettingsPreferredModel] = useState<string>('gemini-3.8-flash');
  const [settingsRetention, setSettingsRetention] = useState<'indefinite' | 'auto_cleanup_30d' | 'auto_cleanup_7d'>('indefinite');
  const [settingsAutoCleanupTemp, setSettingsAutoCleanupTemp] = useState<boolean>(true);
  const [savingSettings, setSavingSettings] = useState<boolean>(false);
  const [settingsFeedback, setSettingsFeedback] = useState<{ type: 'success' | 'warning' | 'error'; message: string; invalidatedItems?: string[] } | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState<string>('');
  const [deletingProjectWithConfirm, setDeletingProjectWithConfirm] = useState<boolean>(false);
  const [cleaningTemp, setCleaningTemp] = useState<boolean>(false);
  const [tempCleanupResult, setTempCleanupResult] = useState<string | null>(null);

  // Workflow Canvas Node Inspector (Screen 8 & 08_UI_UX_SPEC.md §8)
  const [inspectingNode, setInspectingNode] = useState<'source' | 'script' | 'video_prompts' | 'thumbnail_prompt' | 'youtube_seo' | 'models' | 'export' | null>(null);

  // Modal states
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [oldestConflict, setOldestConflict] = useState<{ project_id: string; name: string } | null>(null);
  
  // New Project Form
  const [newName, setNewName] = useState('');
  const [newRatio, setNewRatio] = useState<'9:16' | '16:9'>('9:16');
  const [newLanguage, setNewLanguage] = useState<'Hindi' | 'English'>('Hindi');
  const [newDuration, setNewDuration] = useState<number>(32); // default 32s (4 parts)

  // Source form states
  const [sources, setSources] = useState<SourceRecord[]>([]);
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceType, setSourceType] = useState<'pasted_text' | 'url' | 'article' | 'transcript'>('pasted_text');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceContent, setSourceContent] = useState('');
  const [savingSource, setSavingSource] = useState(false);

  const [currentScript, setCurrentScript] = useState<any>(null);
  const [skillsData, setSkillsData] = useState<any>({});
  const [sourceAnalysis, setSourceAnalysis] = useState<any>(null);
  const [scriptAnalysis, setScriptAnalysis] = useState<any>(null);
  const [analyzingSource, setAnalyzingSource] = useState<boolean>(false);
  const [analyzingScript, setAnalyzingScript] = useState<boolean>(false);
  const [generatingScript, setGeneratingScript] = useState(false);
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  const [generatingSeo, setGeneratingSeo] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Script candidate editing states (T-016, T-017, T-018)
  const [isEditingScript, setIsEditingScript] = useState<boolean>(false);
  const [candidateParts, setCandidateParts] = useState<any[]>([]);
  const [candidateValidationErrors, setCandidateValidationErrors] = useState<string[]>([]);
  const [savingCandidate, setSavingCandidate] = useState<boolean>(false);

  // Pipeline execution state
  const [runningPipeline, setRunningPipeline] = useState<boolean>(false);

  // AI Model Center controls (T-023, T-025)
  const [testingConnection, setTestingConnection] = useState<boolean>(false);
  const [connectionResult, setConnectionResult] = useState<{ 
    success: boolean; 
    latency_ms: number; 
    model: string; 
    error?: string;
    diagnostics?: {
      variable_name: string;
      is_present: boolean;
      trimmed_length: number;
      format_valid: boolean;
      format_hint: string;
    };
  } | null>(null);
  const [selectedPreferredModel, setSelectedPreferredModel] = useState<string>('gemini-3.8-flash');
  const [savingModelSettings, setSavingModelSettings] = useState<boolean>(false);
  const [modelSettingsSaved, setModelSettingsSaved] = useState<boolean>(false);

  // In-app toast notification state (replaces window.alert for iframe compatibility)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string } | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 6000);
  };

  // Fallback prompt state when external AI provider encounters rate/billing limits
  const [fallbackPrompt, setFallbackPrompt] = useState<{
    skill: 'script' | 'video' | 'thumbnail' | 'seo' | 'pipeline';
    error: string;
  } | null>(null);

  // Active project data
  const activeProject = projects.find(p => p.project_id === activeProjectId) || null;

  // Copy helper
  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects', {
        headers: { 'x-user-id': currentUser }
      });
      const data = await res.json();
      setProjects(data.projects || []);
      if (!activeProjectId && data.projects?.length > 0) {
        setActiveProjectId(data.projects[0].project_id);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch logs
  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/activity', {
        headers: { 'x-user-id': currentUser }
      });
      const data = await res.json();
      setActivityLogs(data.logs || []);
    } catch (err) {
      console.error('Failed to load logs:', err);
    }
  };

  // Fetch project details
  const fetchProjectDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        headers: { 'x-user-id': currentUser }
      });
      if (res.ok) {
        const data = await res.json();
        setSources(data.sources || []);
        setCurrentScript(data.current_script || null);
        setSkillsData(data.skills || {});
        setSourceAnalysis(data.source_analysis || null);
        setScriptAnalysis(data.script_analysis || null);
      }
    } catch (err) {
      console.error('Failed to load project details:', err);
    }
  };

  // Skill A: Generate Script Handler
  const handleGenerateScript = async (useFallback = false) => {
    if (!activeProjectId) return;
    try {
      setGeneratingScript(true);
      const res = await fetch(`/api/projects/${activeProjectId}/generate-script`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({ use_fallback: useFallback })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Script Generation Notice', data.error || 'Script generation failed');
        if (data.error?.includes('403') || data.error?.includes('429') || data.error?.includes('permission') || data.error?.includes('billing')) {
          setFallbackPrompt({ skill: 'script', error: data.error });
        }
        return;
      }
      setFallbackPrompt(null);
      setCurrentScript(data.script);
      showToast('success', 'Script Generated', `Successfully generated ${data.script?.parts?.length || 0} parts [${data.script?.generation_source === 'mock_fallback' ? 'High-Fidelity Demo Fallback' : 'Real AI Generation'}].`);
      await fetchProjects();
      await fetchProjectDetails(activeProjectId);
      fetchLogs();
    } catch (err: any) {
      showToast('error', 'Network Error', err.message || 'Network error generating script');
    } finally {
      setGeneratingScript(false);
    }
  };

  // Skill B: Generate Video Prompts Handler
  const handleGenerateVideoPrompts = async (useFallback = false) => {
    if (!activeProjectId) return;
    try {
      setGeneratingVideo(true);
      const res = await fetch(`/api/projects/${activeProjectId}/generate-video-prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({ 
          visual_style: 'Cinematic Space Documentary, Photorealistic',
          use_fallback: useFallback
        })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Video Prompts Notice', data.message || data.error || 'Video prompts generation failed');
        if (data.error?.includes('403') || data.error?.includes('429') || data.error?.includes('permission') || data.message?.includes('403')) {
          setFallbackPrompt({ skill: 'video', error: data.message || data.error });
        }
        return;
      }
      setFallbackPrompt(null);
      showToast('success', 'Video Prompts Generated', 'Generated cinematic prompts for all parts.');
      await fetchProjectDetails(activeProjectId);
      fetchLogs();
    } catch (err: any) {
      showToast('error', 'Network Error', err.message || 'Network error generating video prompts');
    } finally {
      setGeneratingVideo(false);
    }
  };

  // Skill C: Generate Thumbnail Prompt Handler
  const handleGenerateThumbnail = async (useFallback = false) => {
    if (!activeProjectId) return;
    try {
      setGeneratingThumbnail(true);
      const res = await fetch(`/api/projects/${activeProjectId}/generate-thumbnail-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({ use_fallback: useFallback })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Thumbnail Prompt Notice', data.message || data.error || 'Thumbnail prompt generation failed');
        if (data.error?.includes('403') || data.error?.includes('429') || data.error?.includes('permission') || data.message?.includes('403')) {
          setFallbackPrompt({ skill: 'thumbnail', error: data.message || data.error });
        }
        return;
      }
      setFallbackPrompt(null);
      showToast('success', 'Thumbnail Generated', 'Master thumbnail intelligence prompt ready.');
      await fetchProjectDetails(activeProjectId);
      fetchLogs();
    } catch (err: any) {
      showToast('error', 'Network Error', err.message || 'Network error generating thumbnail prompt');
    } finally {
      setGeneratingThumbnail(false);
    }
  };

  // Skill D: Generate YouTube SEO Handler
  const handleGenerateSeo = async (useFallback = false) => {
    if (!activeProjectId) return;
    try {
      setGeneratingSeo(true);
      const res = await fetch(`/api/projects/${activeProjectId}/generate-seo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({ use_fallback: useFallback })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'YouTube SEO Notice', data.message || data.error || 'YouTube SEO generation failed');
        if (data.error?.includes('403') || data.error?.includes('429') || data.error?.includes('permission') || data.message?.includes('403')) {
          setFallbackPrompt({ skill: 'seo', error: data.message || data.error });
        }
        return;
      }
      setFallbackPrompt(null);
      showToast('success', 'YouTube SEO Generated', 'Roman Hindi metadata package compiled.');
      await fetchProjectDetails(activeProjectId);
      fetchLogs();
    } catch (err: any) {
      showToast('error', 'Network Error', err.message || 'Network error generating YouTube SEO');
    } finally {
      setGeneratingSeo(false);
    }
  };

  // Start editing script candidate
  const handleStartEditScript = () => {
    if (!currentScript || !currentScript.parts) return;
    setCandidateParts(JSON.parse(JSON.stringify(currentScript.parts)));
    setCandidateValidationErrors([]);
    setIsEditingScript(true);
  };

  // Save candidate script with candidate validation (T-016, T-017, T-018)
  const handleSaveCandidateScript = async () => {
    if (!activeProjectId) return;
    try {
      setSavingCandidate(true);
      setCandidateValidationErrors([]);

      const res = await fetch(`/api/projects/${activeProjectId}/script/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({ parts: candidateParts })
      });

      const data = await res.json();
      if (!res.ok) {
        setCandidateValidationErrors(data.validation_errors || [data.error || 'Candidate validation failed']);
        return;
      }

      setIsEditingScript(false);
      setCurrentScript(data.script);
      showToast('success', 'Candidate Script Saved', 'Script v' + data.script.script_version + ' validated and approved state reset (T-018).');
      await fetchProjects();
      await fetchProjectDetails(activeProjectId);
      fetchLogs();
    } catch (err: any) {
      setCandidateValidationErrors(['Network error saving candidate script. Current script was safely preserved.']);
    } finally {
      setSavingCandidate(false);
    }
  };

  // Run full automated pipeline (Skills B, C, D)
  const handleRunFullPipeline = async (useFallback = false) => {
    if (!activeProjectId) return;
    try {
      setRunningPipeline(true);
      const res = await fetch(`/api/projects/${activeProjectId}/pipeline/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({ use_fallback: useFallback })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Pipeline Run Notice', data.message || data.error || 'Pipeline execution failed');
        if (data.error?.includes('403') || data.error?.includes('429') || data.error?.includes('permission') || data.message?.includes('403')) {
          setFallbackPrompt({ skill: 'pipeline', error: data.message || data.error });
        }
        return;
      }
      setFallbackPrompt(null);
      showToast('success', 'Pipeline Finished', 'All three downstream skills (Video, Thumbnail, SEO) completed successfully.');
      await fetchProjects();
      await fetchProjectDetails(activeProjectId);
      fetchLogs();
    } catch (err: any) {
      showToast('error', 'Network Error', err.message || 'Network error executing full pipeline');
    } finally {
      setRunningPipeline(false);
    }
  };

  // Test Gemini API connection
  const handleTestConnection = async () => {
    try {
      setTestingConnection(true);
      setConnectionResult(null);
      const res = await fetch('/api/models/test-connection', {
        method: 'POST',
        headers: { 'x-user-id': currentUser }
      });
      const data = await res.json();
      setConnectionResult(data);
      fetchLogs();
    } catch (err: any) {
      setConnectionResult({ success: false, latency_ms: 0, model: 'gemini-3.8-flash', error: err.message });
    } finally {
      setTestingConnection(false);
    }
  };

  // Save project model settings (T-025, T-026)
  const handleSaveModelSettings = async () => {
    if (!activeProjectId) return;
    try {
      setSavingModelSettings(true);
      const res = await fetch(`/api/projects/${activeProjectId}/model-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({
          preferred_model: selectedPreferredModel,
          alternative_models: selectedPreferredModel === 'gemini-3.8-flash' ? ['gemini-4-argon'] : ['gemini-3.8-flash']
        })
      });
      if (res.ok) {
        setModelSettingsSaved(true);
        setTimeout(() => setModelSettingsSaved(false), 3000);
        showToast('success', 'Model Routing Updated', `Preferred model set to ${selectedPreferredModel}.`);
        await fetchProjects();
        fetchLogs();
      }
    } catch (err) {
      showToast('error', 'Model Settings', 'Failed to save model settings');
    } finally {
      setSavingModelSettings(false);
    }
  };

  // Fetch AI executions and usage summary (Screen 9 / T-030)
  const fetchExecutions = async () => {
    try {
      setUsageLoading(true);
      let url = `/api/executions?`;
      if (activeProjectId) url += `project_id=${activeProjectId}&`;
      if (usageFilterSkill !== 'all') url += `skill_id=${usageFilterSkill}&`;
      if (usageFilterStatus !== 'all') url += `status=${usageFilterStatus}&`;
      const res = await fetch(url, { headers: { 'x-user-id': currentUser } });
      const data = await res.json();
      setExecutions(data.executions || []);
      setUsageSummary(data.summary || null);
    } catch (err) {
      console.error('Failed to load executions:', err);
    } finally {
      setUsageLoading(false);
    }
  };

  // Trigger fallback simulation to test T-026 permission prompt in UI
  const handleSimulateFallback = async () => {
    if (!activeProjectId) return;
    try {
      const res = await fetch(`/api/projects/${activeProjectId}/fallback/trigger-simulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({ skill_id: 'story_to_script' })
      });
      const data = await res.json();
      setPendingFallbackRequest(data);
      await fetchExecutions();
      fetchLogs();
    } catch (err) {
      showToast('error', 'Fallback Simulation', 'Error triggering fallback simulation');
    }
  };

  // Operator decide fallback (T-026)
  const handleDecideFallback = async (approved: boolean) => {
    if (!activeProjectId) return;
    try {
      setFallbackProcessing(true);
      const res = await fetch(`/api/projects/${activeProjectId}/fallback/decide`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
        body: JSON.stringify({
          approved,
          alternative_model: pendingFallbackRequest?.alternative_model || 'gemini-4-argon',
          skill_id: pendingFallbackRequest?.skill_id || 'story_to_script'
        })
      });
      const data = await res.json();
      setPendingFallbackRequest(null);
      showToast(approved ? 'success' : 'info', 'Fallback Decision Recorded', approved ? 'Permission granted for alternative model execution.' : 'Fallback rejected by operator.');
      await fetchExecutions();
      await fetchProjects();
      fetchLogs();
    } catch (err) {
      showToast('error', 'Fallback Error', 'Error responding to fallback prompt');
    } finally {
      setFallbackProcessing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchLogs();
  }, [currentUser]);

  useEffect(() => {
    if (activeProjectId) {
      fetchProjectDetails(activeProjectId);
      fetchExecutions();
    }
  }, [activeProjectId, usageFilterSkill, usageFilterStatus]);

  useEffect(() => {
    if (activeTab === 'usage') {
      fetchExecutions();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeProject) {
      setSettingsName(activeProject.name || '');
      setSettingsRatio(activeProject.aspect_ratio || '9:16');
      setSettingsLanguage(activeProject.content_language || 'Hindi');
      setSettingsDuration(activeProject.duration_seconds || 32);
      setSettingsPreferredModel(activeProject.preferred_model || 'gemini-3.8-flash');
      setSettingsRetention(activeProject.retention_policy || 'indefinite');
      setSettingsAutoCleanupTemp(activeProject.auto_cleanup_temp_files ?? true);
      setSettingsFeedback(null);
      setDeleteConfirmName('');
      setTempCleanupResult(null);
    }
  }, [activeProject?.project_id]);

  // Save project settings enforcing Section 6.2 Staleness Rules
  const handleSaveSettings = async () => {
    if (!activeProjectId) return;
    try {
      setSavingSettings(true);
      setSettingsFeedback(null);

      const res = await fetch(`/api/projects/${activeProjectId}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser
        },
        body: JSON.stringify({
          name: settingsName,
          aspect_ratio: settingsRatio,
          content_language: settingsLanguage,
          duration_seconds: settingsDuration,
          preferred_model: settingsPreferredModel,
          retention_policy: settingsRetention,
          auto_cleanup_temp_files: settingsAutoCleanupTemp
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setSettingsFeedback({
          type: 'error',
          message: data.error || 'Failed to update project settings'
        });
        return;
      }

      setSettingsFeedback({
        type: data.staleness_invalidated ? 'warning' : 'success',
        message: data.message,
        invalidatedItems: data.invalidated_items
      });

      await fetchProjects();
      await fetchProjectDetails(activeProjectId);
      fetchLogs();
    } catch (err: any) {
      setSettingsFeedback({
        type: 'error',
        message: 'Network error saving project settings.'
      });
    } finally {
      setSavingSettings(false);
    }
  };

  // Trigger manual temporary data cleanup (T-032 & Screen 10)
  const handleCleanupTemp = async () => {
    if (!activeProjectId) return;
    try {
      setCleaningTemp(true);
      setTempCleanupResult(null);
      const res = await fetch(`/api/projects/${activeProjectId}/cleanup-temp`, {
        method: 'POST',
        headers: { 'x-user-id': currentUser }
      });
      const data = await res.json();
      if (res.ok) {
        setTempCleanupResult(`Purged ${data.cleaned_items_count} transient/temporary execution records.`);
        await fetchExecutions();
        fetchLogs();
      } else {
        setTempCleanupResult(data.error || 'Cleanup failed');
      }
    } catch (err) {
      setTempCleanupResult('Network error executing retention cleanup');
    } finally {
      setCleaningTemp(false);
    }
  };

  // Delete project with typed-name confirmation (T-006 & Screen 10)
  const handleDeleteProjectConfirmed = async () => {
    if (!activeProjectId || !activeProject) return;
    if (deleteConfirmName.trim() !== activeProject.name.trim()) {
      showToast('error', 'Confirmation Mismatch', `Project name confirmation does not match exact project title "${activeProject.name}".`);
      return;
    }

    try {
      setDeletingProjectWithConfirm(true);
      const res = await fetch(`/api/projects/${activeProjectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser
        },
        body: JSON.stringify({ confirm_name: deleteConfirmName.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Delete Failed', data.message || data.error || 'Failed to delete project');
        return;
      }

      setDeleteConfirmName('');
      setActiveProjectId(null);
      showToast('info', 'Project Permanently Deleted', `Project "${activeProject.name}" was permanently removed.`);
      await fetchProjects();
      setActiveTab('dashboard');
      fetchLogs();
    } catch (err) {
      showToast('error', 'Network Error', 'Network error deleting project');
    } finally {
      setDeletingProjectWithConfirm(false);
    }
  };

  // Handle Create Project
  const handleCreateProject = async (forceDelete = false) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser
        },
        body: JSON.stringify({
          name: newName,
          aspect_ratio: newRatio,
          content_language: newLanguage,
          duration_seconds: newDuration,
          force_delete_oldest: forceDelete
        })
      });

      const data = await res.json();

      if (res.status === 409 && data.error === 'PROJECT_LIMIT_EXCEEDED') {
        setOldestConflict(data.oldest_project);
        return;
      }

      if (!res.ok) {
        showToast('error', 'Creation Error', data.error || 'Failed to create project');
        return;
      }

      setShowNewModal(false);
      setOldestConflict(null);
      setNewName('');
      showToast('success', 'Project Created', `Project "${data.name || 'New Project'}" created successfully.`);
      await fetchProjects();
      setActiveProjectId(data.project_id);
      setActiveTab('source');
      fetchLogs();
    } catch (err) {
      showToast('error', 'Network Error', 'Network error creating project');
    }
  };

  // Handle Save Source
  const handleSaveSource = async () => {
    if (!activeProjectId) return;
    if (!sourceTitle.trim() || !sourceContent.trim()) {
      showToast('warning', 'Missing Content', 'Please enter both source title and source content.');
      return;
    }

    try {
      setSavingSource(true);
      const res = await fetch(`/api/projects/${activeProjectId}/source`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser
        },
        body: JSON.stringify({
          source_title: sourceTitle,
          source_type: sourceType,
          source_url: sourceUrl,
          source_content: sourceContent
        })
      });

      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Validation Failed', data.error || 'Failed to save source');
        return;
      }

      setSourceTitle('');
      setSourceUrl('');
      setSourceContent('');
      showToast('success', 'Source Ingested & Validated', `Source v${data.source_version || 1} saved. Script approval reset per T-018.`);
      await fetchProjectDetails(activeProjectId);
      await fetchProjects();
      fetchLogs();
    } catch (err) {
      showToast('error', 'Network Error', 'Error saving source');
    } finally {
      setSavingSource(false);
    }
  };

  // Handle Delete Project
  const handleDeleteProject = (id: string, name: string) => {
    setProjectToDelete({ id, name });
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      const res = await fetch(`/api/projects/${projectToDelete.id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': currentUser }
      });
      if (res.ok) {
        if (activeProjectId === projectToDelete.id) {
          setActiveProjectId(null);
          setActiveTab('dashboard');
        }
        showToast('info', 'Project Deleted', `Project "${projectToDelete.name}" was removed.`);
        await fetchProjects();
        fetchLogs();
      } else {
        const data = await res.json();
        showToast('error', 'Delete Failed', data.message || 'Failed to delete project');
      }
    } catch (err) {
      showToast('error', 'Network Error', 'Failed to delete project');
    } finally {
      setProjectToDelete(null);
    }
  };

  // Handle Export JSON
  const handleExport = (id: string) => {
    window.location.href = `/api/export/${id}`;
  };

  // Handle Export Multi-File ZIP Package (Master Plan §1.11, Decision D-010)
  const handleExportZip = (id: string) => {
    window.location.href = `/api/projects/${id}/export/zip`;
  };

  // Handle Analyze Source (Master Plan §1.3 & §1.6)
  const handleAnalyzeSource = async () => {
    if (!activeProjectId) return;
    try {
      setAnalyzingSource(true);
      const res = await fetch(`/api/projects/${activeProjectId}/source/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser }
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Source Analysis Failed', data.error || 'Failed to analyze source');
        return;
      }
      setSourceAnalysis(data.analysis);
      showToast('success', 'Source Material Analyzed', `Extracted ${data.analysis.key_facts?.length || 0} key facts and recommended narrative angle.`);
      fetchLogs();
    } catch (err: any) {
      showToast('error', 'Network Error', err.message || 'Error analyzing source material');
    } finally {
      setAnalyzingSource(false);
    }
  };

  // Handle Analyze Script Continuity & Pacing (Master Plan §1.3 & §1.7)
  const handleAnalyzeScript = async () => {
    if (!activeProjectId) return;
    try {
      setAnalyzingScript(true);
      const res = await fetch(`/api/projects/${activeProjectId}/script/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser }
      });
      const data = await res.json();
      if (!res.ok) {
        showToast('error', 'Script Continuity Analysis Failed', data.error || 'Failed to analyze script continuity');
        return;
      }
      setScriptAnalysis(data.analysis);
      showToast('success', 'Script Continuity Analyzed', `Analyzed pacing for ${data.analysis.pacing_breakdown?.length || 0} parts and generated continuity rules.`);
      fetchLogs();
    } catch (err: any) {
      showToast('error', 'Network Error', err.message || 'Error analyzing script continuity');
    } finally {
      setAnalyzingScript(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 flex flex-col font-sans">
      {/* TOP COMMAND BAR */}
      <header className="h-16 border-b border-cyan-950/40 bg-[#0c121d]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent text-lg">
                YT-AUTO
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 ml-2 border border-cyan-500/30 px-1.5 py-0.5 rounded bg-cyan-950/30">
                STRICT MASTER PLAN
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Active project selector badge */}
          {activeProject ? (
            <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-slate-400">Project:</span>
              <span className="font-semibold text-slate-100 max-w-[180px] truncate">{activeProject.name}</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-mono text-[10px]">
                {activeProject.aspect_ratio} • {activeProject.duration_seconds}s
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-500">No project selected</span>
          )}
        </div>

        {/* User Workspace & Quick Status */}
        <div className="flex items-center space-x-4">
          {/* 6-Project Cap Indicator */}
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800/80 px-3 py-1 rounded-md text-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Cap:</span>
            <span className={`font-mono font-bold ${projects.length >= 6 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {projects.length}/6
            </span>
            <span className="text-[10px] text-slate-500">(D-005)</span>
          </div>

          {/* User Authenticated Context (Choice 2) */}
          <div className="flex items-center space-x-2 bg-violet-950/20 border border-violet-800/30 px-3 py-1 rounded-md text-xs">
            <Users className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-slate-400">User:</span>
            <select 
              value={currentUser} 
              onChange={(e) => setCurrentUser(e.target.value)}
              className="bg-transparent text-violet-300 font-mono text-xs focus:outline-none cursor-pointer"
            >
              <option value="creator_master_01" className="bg-slate-900 text-slate-200">creator_master_01 (Admin)</option>
              <option value="creator_studio_02" className="bg-slate-900 text-slate-200">creator_studio_02 (Studio)</option>
              <option value="creator_guest_03" className="bg-slate-900 text-slate-200">creator_guest_03 (Guest)</option>
            </select>
          </div>

          {/* Export Full ZIP Archive (Master Plan §1.11) */}
          {activeProject && (
            <button
              onClick={() => handleExportZip(activeProject.project_id)}
              title="Download Full Project Multi-File ZIP Package"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/60 hover:border-cyan-400 font-medium text-xs transition cursor-pointer shadow-sm"
            >
              <Archive className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export ZIP</span>
            </button>
          )}

          {/* New Project Button */}
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-lg shadow-cyan-600/20 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </header>

      {/* NAVIGATION BAR */}
      <nav className="border-b border-slate-800/60 bg-[#090e17] px-6 flex items-center space-x-1 overflow-x-auto text-xs">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: FolderKanban },
          { id: 'canvas', label: 'Workflow Canvas', icon: Layers },
          { id: 'source', label: 'Source Adding Panel', icon: FileText },
          { id: 'script', label: 'Script Studio', icon: Film },
          { id: 'skills', label: 'Skill Control Center', icon: Cpu },
          { id: 'models', label: 'AI Model Center', icon: Sliders },
          { id: 'usage', label: 'Usage & History', icon: BarChart3 },
          { id: 'activity', label: 'Live Activity & Diagnostics', icon: Terminal },
          { id: 'settings', label: 'Project Settings', icon: Settings },
          { id: 'governance', label: 'Master Plan Governance', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* MAIN WORKSPACE CONTENT */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {/* VIEW: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <span>Project Command Dashboard</span>
                  <span className="text-xs font-normal text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                    Workspace: {currentUser}
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage active projects under the strict 6-project ceiling (D-005) with verified data isolation.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchProjects}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.project_id}
                  onClick={() => {
                    setActiveProjectId(proj.project_id);
                    setActiveTab('canvas');
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer relative overflow-hidden group ${
                    activeProjectId === proj.project_id
                      ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/30'
                      : 'bg-[#0d131f]/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-100 text-sm group-hover:text-cyan-300 transition line-clamp-1">
                        {proj.name}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5">{proj.project_id}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-700/40 bg-cyan-950/40 text-cyan-300 font-bold">
                      {proj.aspect_ratio}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] border-t border-slate-800/80 pt-3">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Duration</span>
                      <span className="font-mono text-slate-200">{proj.duration_seconds}s</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Language</span>
                      <span className="font-mono text-slate-200">{proj.content_language}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Parts</span>
                      <span className="font-mono text-slate-200">{proj.parts_count} parts</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                    <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full ${
                      proj.script_approved ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {proj.script_approved ? 'Script Approved' : 'Draft / Source'}
                    </span>

                    <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        title="Export Multi-File ZIP Package (Master Plan §1.11)"
                        onClick={() => handleExportZip(proj.project_id)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-300"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Export JSON Manifest"
                        onClick={() => handleExport(proj.project_id)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Delete Project"
                        onClick={() => handleDeleteProject(proj.project_id, proj.name)}
                        className="p-1.5 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Project Card */}
              {projects.length < 6 && (
                <div
                  onClick={() => setShowNewModal(true)}
                  className="p-6 rounded-xl border border-dashed border-slate-800 hover:border-cyan-500/40 bg-slate-900/20 hover:bg-cyan-950/10 flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[160px]"
                >
                  <Plus className="w-6 h-6 text-cyan-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-200">Create New Project</span>
                  <span className="text-[10px] text-slate-500 mt-1">{6 - projects.length} slots remaining in ceiling</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: WORKFLOW CANVAS */}
        {activeTab === 'canvas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-100">Live Workflow Canvas (D-032)</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Interactive execution node-graph representing project state and gating controls.
                </p>
              </div>

              {activeProject && (
                <div className="text-xs font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-800/40 px-3 py-1 rounded">
                  Active: {activeProject.name} ({activeProject.aspect_ratio})
                </div>
              )}
            </div>

            {/* Futuristic Workflow Diagram Node Map */}
            <div className="bg-[#0b101b] border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                {/* Node 1: Source */}
                <div 
                  onClick={() => setInspectingNode('source')}
                  className="p-5 rounded-xl bg-slate-900/80 border border-cyan-800/50 hover:border-cyan-400 transition cursor-pointer shadow-lg shadow-cyan-950/40 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-2">
                    <span className="font-bold">STEP 01</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setInspectingNode('source'); }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300"
                        title="Inspect Node"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition">Source Ingestion</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Grounding facts from user raw text, article, or URL.</p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {sources.length > 0 ? `v${sources.length} Validated` : 'Unsaved / Empty'}
                    </span>
                  </div>
                </div>

                {/* Node 2: Script Studio */}
                <div 
                  onClick={() => setInspectingNode('script')}
                  className="p-5 rounded-xl bg-slate-900/80 border border-violet-800/50 hover:border-violet-400 transition cursor-pointer shadow-lg shadow-violet-950/40 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-violet-400 font-mono mb-2">
                    <span className="font-bold">STEP 02</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setInspectingNode('script'); }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-violet-300"
                        title="Inspect Node"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <Film className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-violet-300 transition">Script Studio & Approval</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Duration & part schema validation; approval gate (T-019).</p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Gate State:</span>
                    <span className={`font-mono font-bold ${activeProject?.script_approved ? 'text-emerald-400' : currentScript ? 'text-amber-400' : 'text-slate-500'}`}>
                      {activeProject?.script_approved ? 'APPROVED' : currentScript ? 'AWAITING APPROVAL' : 'NOT GENERATED'}
                    </span>
                  </div>
                </div>

                {/* Node 3: Skill B Video Prompts */}
                <div 
                  onClick={() => setInspectingNode('video_prompts')}
                  className="p-5 rounded-xl bg-slate-900/80 border border-sky-800/50 hover:border-sky-400 transition cursor-pointer shadow-lg shadow-sky-950/40 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-sky-400 font-mono mb-2">
                    <span className="font-bold">STEP 03 (SKILL B)</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setInspectingNode('video_prompts'); }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300"
                        title="Inspect Node"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <Zap className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-sky-300 transition">Video Prompts Engine</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Generates 8s clip prompts with camera, lighting, and timeline cues.</p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Gate / Output:</span>
                    <span className={`font-mono font-bold ${skillsData.video_prompts?.status === 'COMPLETED' ? 'text-emerald-400' : activeProject?.script_approved ? 'text-sky-400' : 'text-amber-400'}`}>
                      {skillsData.video_prompts?.status === 'COMPLETED' ? 'COMPLETED' : activeProject?.script_approved ? 'READY' : 'LOCKED (T-019)'}
                    </span>
                  </div>
                </div>

                {/* Node 4: Skill C Thumbnail Engine */}
                <div 
                  onClick={() => setInspectingNode('thumbnail_prompt')}
                  className="p-5 rounded-xl bg-slate-900/80 border border-fuchsia-800/50 hover:border-fuchsia-400 transition cursor-pointer shadow-lg shadow-fuchsia-950/40 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-fuchsia-400 font-mono mb-2">
                    <span className="font-bold">STEP 04 (SKILL C)</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setInspectingNode('thumbnail_prompt'); }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-fuchsia-300"
                        title="Inspect Node"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <Image className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-fuchsia-300 transition">AI Thumbnail Engine</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Whole-script analysis creating master visual thumbnail prompt.</p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Gate / Output:</span>
                    <span className={`font-mono font-bold ${skillsData.thumbnail_prompt?.status === 'COMPLETED' ? 'text-emerald-400' : activeProject?.script_approved ? 'text-fuchsia-400' : 'text-amber-400'}`}>
                      {skillsData.thumbnail_prompt?.status === 'COMPLETED' ? 'COMPLETED' : activeProject?.script_approved ? 'READY' : 'LOCKED (T-019)'}
                    </span>
                  </div>
                </div>

                {/* Node 5: Skill D YouTube SEO */}
                <div 
                  onClick={() => setInspectingNode('youtube_seo')}
                  className="p-5 rounded-xl bg-slate-900/80 border border-emerald-800/50 hover:border-emerald-400 transition cursor-pointer shadow-lg shadow-emerald-950/40 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-2">
                    <span className="font-bold">STEP 05 (SKILL D)</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setInspectingNode('youtube_seo'); }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300"
                        title="Inspect Node"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <Cpu className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition">YouTube SEO (Roman Hindi)</h3>
                  <p className="text-[11px] text-slate-400 mt-1">High-CTR Title, Description, and Tags in Roman Hindi (D-019).</p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Gate / Output:</span>
                    <span className={`font-mono font-bold ${skillsData.youtube_seo?.status === 'COMPLETED' ? 'text-emerald-400' : activeProject?.script_approved ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {skillsData.youtube_seo?.status === 'COMPLETED' ? 'COMPLETED' : activeProject?.script_approved ? 'READY' : 'LOCKED (T-019)'}
                    </span>
                  </div>
                </div>

                {/* Node 6: Model Center */}
                <div 
                  onClick={() => setInspectingNode('models')}
                  className="p-5 rounded-xl bg-slate-900/80 border border-amber-800/50 hover:border-amber-400 transition cursor-pointer shadow-lg shadow-amber-950/40 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                    <span className="font-bold">STEP 06</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setInspectingNode('models'); }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300"
                        title="Inspect Node"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <Sliders className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition">AI Provider & Routing</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Google Gemini modern SDK; strict permission-gated fallback (D-025).</p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Model:</span>
                    <span className="text-amber-300 font-mono font-bold">
                      {activeProject?.preferred_model || 'gemini-3.8-flash'}
                    </span>
                  </div>
                </div>

                {/* Node 7: Export */}
                <div 
                  onClick={() => setInspectingNode('export')}
                  className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-600 transition cursor-pointer shadow-lg relative group md:col-span-2 lg:col-span-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span className="font-bold">STEP 07 (OUTPUT PACKAGE)</span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setInspectingNode('export'); }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Inspect Node"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <Download className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition">Sanitized Package Export</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Complete project data JSON manifest. Vault protected; all API keys scrubbed.</p>
                    </div>
                    {activeProjectId && (
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportZip(activeProjectId);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 shrink-0 shadow-md shadow-cyan-950/40"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>Export Multi-File ZIP</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExport(activeProjectId);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>JSON Manifest</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-300">Phase 1 Contract Freeze Complete</h4>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Authoritative specifications for all four skills (Story-to-Script, Script-to-Video Prompts, AI Thumbnail Intelligence, and YouTube SEO Engine) have been received, verified, and frozen under <code className="text-emerald-300 font-mono">/src/contracts/</code>. Decision D (<code className="text-emerald-300 font-mono">D-036</code>) is officially resolved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: SOURCE ADDING PANEL */}
        {activeTab === 'source' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-100">Source Adding Panel (01_MASTER_PLAN.md §1.6)</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Input source content to anchor all future fact-grounded script generation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Source Input Form */}
              <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Source Title</label>
                  <input
                    type="text"
                    value={sourceTitle}
                    onChange={(e) => setSourceTitle(e.target.value)}
                    placeholder="e.g., DeepSeek AI Breakthrough Analysis 2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Source Type</label>
                    <select
                      value={sourceType}
                      onChange={(e) => setSourceType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="pasted_text">Pasted Text</option>
                      <option value="article">Article Content</option>
                      <option value="url">Web URL</option>
                      <option value="transcript">Video Transcript</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Source URL (Optional)</label>
                    <input
                      type="url"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder="https://example.com/article"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Main Source Content (Required for validation)
                  </label>
                  <textarea
                    rows={8}
                    value={sourceContent}
                    onChange={(e) => setSourceContent(e.target.value)}
                    placeholder="Paste the full factual content, article text, or research notes here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    A meaningful source edit increments <code className="text-cyan-400">source_version</code> and invalidates prior approvals.
                  </span>
                  <button
                    onClick={handleSaveSource}
                    disabled={savingSource || !sourceTitle || !sourceContent}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{savingSource ? 'Saving...' : 'Save & Validate Source'}</span>
                  </button>
                </div>
              </div>

              {/* Source Version History */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-semibold text-slate-100 text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Source Versions</span>
                  <span className="text-cyan-400 font-mono">{sources.length} Total</span>
                </h3>

                {sources.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No source versions saved yet for this project.</p>
                ) : (
                  <div className="space-y-3">
                    {sources.map((src) => (
                      <div key={src.source_id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-300">v{src.source_version}: {src.source_title}</span>
                          <span className="text-[10px] font-mono text-emerald-400">{src.source_status}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{src.source_content}</p>
                        <span className="text-[9px] text-slate-600 block">{new Date(src.created_at).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* STANDALONE SOURCE FACT & CONTEXT ANALYSIS (MASTER PLAN §1.3 & §1.6) */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center border border-cyan-800/60">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                      <span>Source Fact & Context Analysis</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        Master Plan §1.3 & §1.6
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Standalone factual extraction, entity grounding, and narrative angle recommendation cached for downstream skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-start sm:self-auto">
                  {sourceAnalysis && (
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold flex items-center space-x-1.5 ${
                      sourceAnalysis.status === 'valid'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {sourceAnalysis.status === 'valid' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Valid Context Cache</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Stale — Upstream Source Modified</span>
                        </>
                      )}
                    </span>
                  )}

                  <button
                    onClick={handleAnalyzeSource}
                    disabled={analyzingSource || sources.length === 0}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-md shadow-cyan-950/40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${analyzingSource ? 'animate-spin' : ''}`} />
                    <span>{analyzingSource ? 'Analyzing Source...' : sourceAnalysis ? 'Re-analyze Source Material' : 'Analyze Source Material'}</span>
                  </button>
                </div>
              </div>

              {sourceAnalysis ? (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Detected Topic & Domain</span>
                      <p className="font-semibold text-slate-200 text-xs">{sourceAnalysis.detected_topic}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Recommended Narrative Angle</span>
                      <p className="font-semibold text-cyan-200 text-xs">{sourceAnalysis.narrative_angle_recommendation}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Extracted Grounding Facts ({sourceAnalysis.key_facts?.length || 0})
                    </span>
                    <ul className="space-y-1.5 pl-2">
                      {sourceAnalysis.key_facts?.map((fact: string, idx: number) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                          <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                          <span className="leading-relaxed">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Core Identified Entities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sourceAnalysis.core_entities?.map((entity: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                          {entity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Traceability: {sourceAnalysis.fact_traceability_notes}</span>
                    <span>Analyzed: {new Date(sourceAnalysis.analyzed_at).toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400">
                    No standalone source analysis record generated yet for this project.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Click "Analyze Source Material" above to extract verified facts, detected topic, and narrative angle recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: SCRIPT STUDIO */}
        {activeTab === 'script' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <Film className="w-5 h-5 text-cyan-400" />
                  <span>Script Studio & Approval Gate (01_MASTER_PLAN.md §1.7)</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Latest validated script store (no drift). Script approval is strictly required before downstream prompt generation (T-019).
                </p>
              </div>

              {activeProject && (
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Skill A Trigger */}
                  <button
                    onClick={() => handleGenerateScript(false)}
                    disabled={generatingScript || sources.length === 0 || sources[sources.length - 1].source_status !== 'validated'}
                    className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs transition cursor-pointer flex items-center space-x-2 shadow-lg shadow-cyan-950/40"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${generatingScript ? 'animate-spin' : ''}`} />
                    <span>{generatingScript ? 'Generating...' : 'Generate Script via Skill A'}</span>
                  </button>

                  {/* Edit Script Parts (T-016, T-017, T-018) */}
                  {currentScript && (
                    <button
                      onClick={handleStartEditScript}
                      disabled={isEditingScript}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 shadow-md"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Edit Script Parts</span>
                    </button>
                  )}

                  {/* Approval Toggle */}
                  {currentScript && (
                    <button
                      onClick={async () => {
                        if (!activeProjectId) return;
                        await fetch(`/api/projects/${activeProjectId}/script/approve`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser },
                          body: JSON.stringify({ approved: !activeProject.script_approved })
                        });
                        await fetchProjects();
                        await fetchProjectDetails(activeProjectId);
                        fetchLogs();
                      }}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                        activeProject.script_approved
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                          : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-950/40'
                      }`}
                    >
                      {activeProject.script_approved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Script Approved (Unlocked)</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Approve Current Script</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* One-Click Full Production Pipeline */}
                  {currentScript && activeProject.script_approved && (
                    <button
                      onClick={() => handleRunFullPipeline(false)}
                      disabled={runningPipeline}
                      className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-violet-950/50"
                    >
                      <Zap className={`w-3.5 h-3.5 text-amber-300 ${runningPipeline ? 'animate-bounce' : ''}`} />
                      <span>{runningPipeline ? 'Running Pipeline...' : 'Run Full Pipeline (Skills B, C, D)'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Spec Bar */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-slate-500">Duration: </span>
                  <span className="font-mono text-cyan-300 font-bold">{activeProject?.duration_seconds}s</span>
                </div>
                <span className="text-slate-700">•</span>
                <div>
                  <span className="text-slate-500">Required Parts: </span>
                  <span className="font-mono text-cyan-300 font-bold">{activeProject?.parts_count} parts (8s each)</span>
                </div>
                <span className="text-slate-700">•</span>
                <div>
                  <span className="text-slate-500">Language: </span>
                  <span className="font-mono text-cyan-300 font-bold">{activeProject?.content_language}</span>
                </div>
                <span className="text-slate-700">•</span>
                <div>
                  <span className="text-slate-500">Ratio: </span>
                  <span className="font-mono text-cyan-300 font-bold">{activeProject?.aspect_ratio}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-500">Source:</span>
                {sources.length > 0 && sources[sources.length - 1].source_status === 'validated' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>v{sources[sources.length - 1].source_version} Validated</span>
                  </span>
                ) : (
                  <button 
                    onClick={() => setActiveTab('source')}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800/50 hover:bg-amber-900 transition flex items-center space-x-1"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    <span>Source Required &rarr;</span>
                  </button>
                )}
              </div>
            </div>

            {/* Downstream Gate Status Banner */}
            {currentScript && (
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                activeProject?.script_approved
                  ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-300'
                  : 'bg-amber-950/20 border-amber-800/60 text-amber-300'
              }`}>
                <div className="flex items-center space-x-3">
                  {activeProject?.script_approved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-amber-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-bold text-xs">
                      {activeProject?.script_approved
                        ? 'Script Approval Active — Downstream Prompt Engines Unlocked'
                        : 'Downstream Gate Enforced — Script Approval Required (T-019)'}
                    </h4>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      {activeProject?.script_approved
                        ? 'Skills B (Video Prompts), C (Thumbnail Prompt), and D (YouTube SEO) can now be executed.'
                        : 'Review the generated 8-second parts below and click "Approve Current Script" above to unlock downstream tools.'}
                    </p>
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono opacity-70">
                  {currentScript.validation_status === 'valid' ? 'Validation: PASSED' : 'Validation: PENDING'}
                </div>
              </div>
            )}

            {/* CANDIDATE SCRIPT EDITOR (T-016, T-017, T-018) */}
            {isEditingScript && (
              <div className="bg-slate-900/90 border-2 border-cyan-500/50 rounded-2xl p-6 space-y-6 shadow-2xl shadow-cyan-950/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Edit3 className="w-4 h-4 text-cyan-400" />
                      <h3 className="font-bold text-slate-100 text-sm">Interactive Candidate Script Editor</h3>
                      <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
                        T-016 / T-017 / T-018
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Edit script parts below. Edits are validated as a replacement candidate. If candidate validation fails, your current saved script remains 100% preserved (T-016). Saving an edit revokes approval and re-locks downstream engines (T-018).
                    </p>
                  </div>

                  {/* Candidate Duration Check Pill */}
                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    {(() => {
                      const totalDur = candidateParts.reduce((sum, p) => sum + (Number(p.duration_seconds) || 0), 0);
                      const isMatch = totalDur === activeProject?.duration_seconds;
                      return (
                        <div className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold flex items-center space-x-1.5 ${
                          isMatch ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : 'bg-rose-950/80 text-rose-300 border-rose-800'
                        }`}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>Candidate: {totalDur}s / Required: {activeProject?.duration_seconds}s</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Validation Errors Box */}
                {candidateValidationErrors.length > 0 && (
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/80 space-y-2">
                    <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Candidate Validation Failed — Saved Script Preserved Untouched (T-016)</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-rose-200/90 space-y-1">
                      {candidateValidationErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Part-by-Part Editable Fields */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {candidateParts.map((part, index) => (
                    <div key={index} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold border border-cyan-800">
                            {index + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-200">Part #{index + 1}</span>
                          <select
                            value={part.part_type}
                            onChange={(e) => {
                              const updated = [...candidateParts];
                              updated[index].part_type = e.target.value;
                              setCandidateParts(updated);
                            }}
                            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded px-2 py-0.5 focus:border-cyan-500 focus:outline-none"
                          >
                            <option value="Hook">Hook</option>
                            <option value="Story">Story</option>
                            <option value="Ending">Ending</option>
                          </select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] text-slate-400">Duration (seconds):</span>
                          <input
                            type="number"
                            value={part.duration_seconds}
                            onChange={(e) => {
                              const updated = [...candidateParts];
                              updated[index].duration_seconds = Number(e.target.value);
                              setCandidateParts(updated);
                            }}
                            className="w-16 bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 rounded px-2 py-0.5 text-center focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Voiceover Edit */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Voiceover Narration
                        </label>
                        <textarea
                          rows={2}
                          value={part.voiceover}
                          onChange={(e) => {
                            const updated = [...candidateParts];
                            updated[index].voiceover = e.target.value;
                            setCandidateParts(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      {/* Visual & On-Screen Edit */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            Visual Scene Direction
                          </label>
                          <input
                            type="text"
                            value={part.visual_suggestion || ''}
                            onChange={(e) => {
                              const updated = [...candidateParts];
                              updated[index].visual_suggestion = e.target.value;
                              setCandidateParts(updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            On-Screen Text
                          </label>
                          <input
                            type="text"
                            value={part.on_screen_text || ''}
                            onChange={(e) => {
                              const updated = [...candidateParts];
                              updated[index].on_screen_text = e.target.value;
                              setCandidateParts(updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Candidate Action Buttons */}
                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setIsEditingScript(false);
                      setCandidateValidationErrors([]);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                  >
                    Cancel Candidate Edit
                  </button>

                  <button
                    onClick={handleSaveCandidateScript}
                    disabled={savingCandidate}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer flex items-center space-x-2 shadow-lg shadow-cyan-950/50"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${savingCandidate ? 'animate-spin' : ''}`} />
                    <span>{savingCandidate ? 'Validating Candidate...' : 'Validate & Apply Replacement Script'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Generated Script Parts Display */}
            {currentScript && currentScript.parts && currentScript.parts.length > 0 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>Synchronized Script Parts ({currentScript.parts.length} Total)</span>
                    </h3>
                    <GenerationBadge 
                      source={currentScript.generation_source} 
                      model={currentScript.model_used} 
                      latencyMs={currentScript.latency_ms} 
                      tokensUsed={currentScript.tokens_used} 
                    />
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentScript.script_content, 'full_script')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedKey === 'full_script' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'full_script' ? 'Copied Full Script' : 'Copy Full Script'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentScript.parts.map((part: any) => (
                    <div 
                      key={part.part_number}
                      className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 space-y-3 hover:border-slate-700 transition"
                    >
                      {/* Part Header */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-800">
                            {part.part_number}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            part.part_type === 'Hook'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                              : part.part_type === 'Ending'
                              ? 'bg-purple-950 text-purple-300 border border-purple-800/60'
                              : 'bg-blue-950 text-blue-300 border border-blue-800/60'
                          }`}>
                            {part.part_type}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            ⏱ {part.duration_seconds} seconds
                          </span>
                        </div>

                        <button
                          onClick={() => copyToClipboard(part.voiceover, `vo_${part.part_number}`)}
                          className="text-[11px] text-slate-400 hover:text-cyan-300 transition flex items-center space-x-1 cursor-pointer"
                        >
                          {copiedKey === `vo_${part.part_number}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `vo_${part.part_number}` ? 'Copied VO' : 'Copy VO'}</span>
                        </button>
                      </div>

                      {/* Voiceover Text */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                          Voiceover Narration ({activeProject?.content_language === 'Hindi' ? 'Devanagari Hindi' : 'English'})
                        </span>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/60 text-slate-100 text-sm leading-relaxed font-sans">
                          {part.voiceover}
                        </div>
                      </div>

                      {/* Visual & On-Screen Suggestions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/60 space-y-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Visual Scene Direction</span>
                          <p className="text-[11px] text-slate-300 leading-normal">{part.visual_suggestion}</p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/60 space-y-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">On-Screen Text / Hook</span>
                          <p className="text-[11px] text-cyan-300 font-mono">{part.on_screen_text || 'None'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-10 text-center space-y-4">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-100 text-sm">No Script Generated for This Project</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {sources.length > 0 && sources[sources.length - 1].source_status === 'validated'
                      ? 'Source is validated! Click "Generate Script via Skill A" above to run the Story-to-Script engine conforming to frozen specification v1.0.'
                      : 'Please add and validate a source document first in the Source Management tab before generating a script.'}
                  </p>
                </div>
                {sources.length > 0 && sources[sources.length - 1].source_status === 'validated' ? (
                  <button
                    onClick={() => handleGenerateScript(false)}
                    disabled={generatingScript}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition cursor-pointer inline-flex items-center space-x-2 shadow-lg shadow-cyan-950/50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{generatingScript ? 'Generating Script...' : 'Generate Script Now'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('source')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>Go to Source Management &rarr;</span>
                  </button>
                )}
              </div>
            )}

            {/* STANDALONE SCRIPT CONTINUITY & PACING ANALYSIS (MASTER PLAN §1.3 & §1.7) */}
            {currentScript && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-violet-950 flex items-center justify-center border border-violet-800/60">
                      <Film className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                        <span>Script Continuity & Pacing Analysis</span>
                        <span className="text-[10px] font-mono text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40">
                          Master Plan §1.3 & §1.7
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Evaluates narrative pacing across 8s parts, continuity enforcement rules, and audiovisual atmosphere.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-start sm:self-auto">
                    {scriptAnalysis && (
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold flex items-center space-x-1.5 ${
                        scriptAnalysis.status === 'valid'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {scriptAnalysis.status === 'valid' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Valid Continuity Cache</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span>Stale — Candidate Script Modified</span>
                          </>
                        )}
                      </span>
                    )}

                    <button
                      onClick={handleAnalyzeScript}
                      disabled={analyzingScript}
                      className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-md shadow-violet-950/40"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${analyzingScript ? 'animate-spin' : ''}`} />
                      <span>{analyzingScript ? 'Analyzing Continuity...' : scriptAnalysis ? 'Re-analyze Script Continuity' : 'Analyze Script Continuity'}</span>
                    </button>
                  </div>
                </div>

                {scriptAnalysis ? (
                  <div className="space-y-4 pt-1">
                    {/* Part Pacing Breakdown */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Part-by-Part Emotional Tone & Pacing Breakdown
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {scriptAnalysis.pacing_breakdown?.map((item: any) => (
                          <div key={item.part_number} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-200">Part {item.part_number} ({item.seconds}s)</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                                item.pacing_rating === 'fast'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                                  : item.pacing_rating === 'climactic'
                                  ? 'bg-purple-950 text-purple-300 border border-purple-800/60'
                                  : 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                              }`}>
                                {item.pacing_rating}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal">
                              {item.emotional_tone}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Continuity Rules & Visual Motifs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 block">
                          Visual Motifs & Scene Cohesion
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {scriptAnalysis.visual_motifs?.map((motif: string, idx: number) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-violet-300">
                              {motif}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                          Audio Atmosphere & Soundscape
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {scriptAnalysis.audio_atmosphere}
                        </p>
                      </div>
                    </div>

                    {/* Continuity Rules */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Continuity Rules ({scriptAnalysis.continuity_rules?.length || 0})
                      </span>
                      <ul className="space-y-1.5 pl-2">
                        {scriptAnalysis.continuity_rules?.map((rule: string, idx: number) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                            <span className="text-violet-400 font-bold shrink-0 mt-0.5">•</span>
                            <span className="leading-relaxed">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Script Hash: {scriptAnalysis.script_hash}</span>
                      <span>Analyzed: {new Date(scriptAnalysis.analyzed_at).toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center space-y-2">
                    <p className="text-xs text-slate-400">
                      No standalone script continuity analysis generated yet for this script.
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Click "Analyze Script Continuity" above to generate part-by-part pacing, scene motifs, and continuity rules.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW: SKILL CONTROL CENTER */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  <span>Skill Control Center (01_MASTER_PLAN.md §1.2 & §1.7)</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Four strictly isolated skills governed by their frozen contracts. Downstream generation is locked until script is approved (T-019).
                </p>
              </div>

              {/* Header Actions & Gate Status */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {activeProject?.script_approved && (
                  <button
                    onClick={() => handleRunFullPipeline(false)}
                    disabled={runningPipeline}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-violet-950/40"
                  >
                    <Zap className={`w-3.5 h-3.5 text-amber-300 ${runningPipeline ? 'animate-bounce' : ''}`} />
                    <span>{runningPipeline ? 'Running Pipeline...' : 'Run Full Pipeline (Skills B, C, D)'}</span>
                  </button>
                )}

                {/* Quick Status Pill */}
                {activeProject?.script_approved ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-mono flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Script Approved (Downstream Unlocked)</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[11px] font-mono flex items-center space-x-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Script Pending Approval (Downstream Locked)</span>
                  </span>
                )}
              </div>
            </div>

            {/* SKILL CARDS STACK */}
            <div className="space-y-6">
              {/* SKILL A: Story-to-Script */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      SKILL A
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm">Story-to-Script Engine</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Frozen v1.0 (D-036)
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTab('script')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs transition cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Open in Script Studio</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Accepts validated factual source content to generate structured 8-second parts with Devanagari Hindi or English voiceover, visual suggestions, and on-screen text.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Current Status</span>
                    <span className="font-semibold text-slate-200">{currentScript ? `${currentScript.parts.length} parts generated` : 'No script generated'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Approval State</span>
                    <span className={`font-semibold ${activeProject?.script_approved ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {activeProject?.script_approved ? 'Approved by Operator' : 'Pending Review'}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Contract File</span>
                    <span className="font-mono text-cyan-400 text-[11px]">skill_a_story_to_script.md</span>
                  </div>
                </div>
              </div>

              {/* SKILL B: Script-to-Video Prompts */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-950 text-violet-300 border border-violet-800">
                      SKILL B
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm">Script-to-Video Prompt Engineering</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Frozen v1.0 (D-036)
                    </span>
                  </div>

                  {activeProject?.script_approved ? (
                    <button
                      onClick={() => handleGenerateVideoPrompts(false)}
                      disabled={generatingVideo}
                      className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-violet-950/40"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${generatingVideo ? 'animate-spin' : ''}`} />
                      <span>{generatingVideo ? 'Generating Video Prompts...' : 'Generate Video Prompts'}</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-slate-950 text-amber-400 border border-amber-900/50 text-xs font-mono flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked (Awaiting Script Approval)</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Converts approved 8-second script parts into production-ready cinematic AI video generation prompts with detailed camera direction, lighting, motion, and continuity constraints.
                </p>

                {/* Downstream Gate Enforcement Check */}
                {!activeProject?.script_approved ? (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs flex items-center space-x-3">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Gate Active:</strong> Per 01_MASTER_PLAN.md §1.7 and T-019, Script-to-Video prompt generation cannot be executed until the script has been approved in Script Studio.
                    </span>
                  </div>
                ) : skillsData?.video_prompts?.data?.clip_prompts ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-slate-300">Generated Video Clips ({skillsData.video_prompts.data.clip_prompts.length})</span>
                        <GenerationBadge
                          source={skillsData.video_prompts.generation_source}
                          model={skillsData.video_prompts.model_used}
                          latencyMs={skillsData.video_prompts.latency_ms}
                          tokensUsed={skillsData.video_prompts.tokens_used}
                        />
                      </div>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(skillsData.video_prompts.data, null, 2), 'all_video')}
                        className="text-cyan-400 hover:text-cyan-300 transition flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedKey === 'all_video' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'all_video' ? 'Copied All Prompts' : 'Copy All Clip Prompts (JSON)'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {skillsData.video_prompts.data.clip_prompts.map((clip: any) => (
                        <div key={clip.clip_number} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded font-mono font-bold bg-violet-950 text-violet-300 border border-violet-800">
                                Clip #{clip.clip_number}
                              </span>
                              <span className="text-slate-400 font-mono text-[11px]">{clip.timeline}</span>
                              <span className="text-slate-500 font-mono text-[11px]">• {clip.camera_movement}</span>
                            </div>

                            <button
                              onClick={() => copyToClipboard(clip.prompt, `clip_${clip.clip_number}`)}
                              className="text-[11px] text-slate-400 hover:text-violet-300 transition flex items-center space-x-1 cursor-pointer"
                            >
                              {copiedKey === `clip_${clip.clip_number}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedKey === `clip_${clip.clip_number}` ? 'Copied' : 'Copy Prompt'}</span>
                            </button>
                          </div>

                          <p className="font-mono text-xs text-slate-200 bg-slate-900/60 p-3 rounded-lg border border-slate-800/50 leading-relaxed">
                            {clip.prompt}
                          </p>

                          <div className="flex flex-wrap gap-2 text-[10px] text-slate-400">
                            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Lighting: {clip.lighting}</span>
                            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Ratio: {clip.aspect_ratio}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                    Script is approved! Click "Generate Video Prompts" above to create synchronized video clip prompts.
                  </div>
                )}
              </div>

              {/* SKILL C: AI Thumbnail Intelligence */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-800">
                      SKILL C
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm">AI Thumbnail Intelligence Engine</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Frozen v1.0 (D-036)
                    </span>
                  </div>

                  {activeProject?.script_approved ? (
                    <button
                      onClick={() => handleGenerateThumbnail(false)}
                      disabled={generatingThumbnail}
                      className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-sky-950/40"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${generatingThumbnail ? 'animate-spin' : ''}`} />
                      <span>{generatingThumbnail ? 'Generating Master Prompt...' : 'Generate Thumbnail Prompt'}</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-slate-950 text-amber-400 border border-amber-900/50 text-xs font-mono flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked (Awaiting Script Approval)</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Analyzes the entire script holistically to generate exactly ONE high-impact image-generation prompt designed specifically for YouTube click-through performance.
                </p>

                {!activeProject?.script_approved ? (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs flex items-center space-x-3">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Gate Active:</strong> Per 01_MASTER_PLAN.md §1.7 and T-019, Thumbnail Prompt generation is locked until script approval.
                    </span>
                  </div>
                ) : skillsData?.thumbnail_prompt?.data ? (
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-semibold text-slate-300">Selected Angle:</span>
                        <span className="text-sky-300 font-bold">{skillsData.thumbnail_prompt.data.selected_thumbnail_angle}</span>
                        <GenerationBadge
                          source={skillsData.thumbnail_prompt.generation_source}
                          model={skillsData.thumbnail_prompt.model_used}
                          latencyMs={skillsData.thumbnail_prompt.latency_ms}
                          tokensUsed={skillsData.thumbnail_prompt.tokens_used}
                        />
                      </div>

                      <button
                        onClick={() => copyToClipboard(skillsData.thumbnail_prompt.data.master_thumbnail_prompt, 'thumb_prompt')}
                        className="px-3 py-1 rounded bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800 text-xs transition flex items-center space-x-1.5 cursor-pointer"
                      >
                        {copiedKey === 'thumb_prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'thumb_prompt' ? 'Copied Master Prompt' : 'Copy Master Prompt'}</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Master Generation Prompt</span>
                      <p className="font-mono text-xs text-slate-100 bg-slate-900/70 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                        {skillsData.thumbnail_prompt.data.master_thumbnail_prompt}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Focal Point & Layout</span>
                        <p className="text-[11px] text-slate-300">{skillsData.thumbnail_prompt.data.focal_point}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Text Overlay Recommendation</span>
                        <p className="text-[11px] text-cyan-300 font-bold font-mono">
                          {skillsData.thumbnail_prompt.data.text_overlay ? `"${skillsData.thumbnail_prompt.data.text_overlay}"` : 'No text overlay (visual only)'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                    Script is approved! Click "Generate Thumbnail Prompt" above to create the master visual prompt.
                  </div>
                )}
              </div>

              {/* SKILL D: YouTube SEO Engine */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      SKILL D
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm">YouTube SEO Engine</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Frozen v1.0 (D-036)
                    </span>
                  </div>

                  {activeProject?.script_approved ? (
                    <button
                      onClick={() => handleGenerateSeo(false)}
                      disabled={generatingSeo}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-emerald-950/40"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${generatingSeo ? 'animate-spin' : ''}`} />
                      <span>{generatingSeo ? 'Generating SEO...' : 'Generate YouTube SEO'}</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-slate-950 text-amber-400 border border-amber-900/50 text-xs font-mono flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked (Awaiting Script Approval)</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Produces high-ranking YouTube metadata optimized for search discovery and viewer retention.
                  </p>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800 shrink-0">
                    Mandatory Roman Hindi (D-019)
                  </span>
                </div>

                {!activeProject?.script_approved ? (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs flex items-center space-x-3">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Gate Active:</strong> Per 01_MASTER_PLAN.md §1.7 and T-019, YouTube SEO generation is locked until script approval.
                    </span>
                  </div>
                ) : skillsData?.youtube_seo?.data ? (
                  <div className="space-y-4 pt-1">
                    {/* Title */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                      <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">Optimized Video Title (Roman Hindi)</span>
                          <GenerationBadge
                            source={skillsData.youtube_seo.generation_source}
                            model={skillsData.youtube_seo.model_used}
                            latencyMs={skillsData.youtube_seo.latency_ms}
                            tokensUsed={skillsData.youtube_seo.tokens_used}
                          />
                        </div>
                        <button
                          onClick={() => copyToClipboard(skillsData.youtube_seo.data.title, 'seo_title')}
                          className="text-slate-400 hover:text-emerald-300 transition flex items-center space-x-1 cursor-pointer text-[11px]"
                        >
                          {copiedKey === 'seo_title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'seo_title' ? 'Copied' : 'Copy Title'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-bold text-slate-100">{skillsData.youtube_seo.data.title}</p>
                    </div>

                    {/* Description */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">Full Video Description (Roman Hindi)</span>
                        <button
                          onClick={() => copyToClipboard(skillsData.youtube_seo.data.description, 'seo_desc')}
                          className="text-slate-400 hover:text-emerald-300 transition flex items-center space-x-1 cursor-pointer text-[11px]"
                        >
                          {copiedKey === 'seo_desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'seo_desc' ? 'Copied' : 'Copy Description'}</span>
                        </button>
                      </div>
                      <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 max-h-48 overflow-y-auto">
                        {skillsData.youtube_seo.data.description}
                      </pre>
                    </div>

                    {/* Tags & Keywords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Tags */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">Comma-Separated Tags (YT Studio Paste)</span>
                          <button
                            onClick={() => copyToClipboard(skillsData.youtube_seo.data.tags, 'seo_tags')}
                            className="text-slate-400 hover:text-emerald-300 transition flex items-center space-x-1 cursor-pointer text-[11px]"
                          >
                            {copiedKey === 'seo_tags' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === 'seo_tags' ? 'Copied' : 'Copy Tags'}</span>
                          </button>
                        </div>
                        <p className="text-xs font-mono text-cyan-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 break-words">
                          {skillsData.youtube_seo.data.tags}
                        </p>
                      </div>

                      {/* Hashtags */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">Hashtags</span>
                          <button
                            onClick={() => copyToClipboard((skillsData.youtube_seo.data.hashtags || []).join(' '), 'seo_hash')}
                            className="text-slate-400 hover:text-emerald-300 transition flex items-center space-x-1 cursor-pointer text-[11px]"
                          >
                            {copiedKey === 'seo_hash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === 'seo_hash' ? 'Copied' : 'Copy Hashtags'}</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(skillsData.youtube_seo.data.hashtags || []).map((h: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 rounded font-mono text-xs bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                              {h.startsWith('#') ? h : `#${h}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                    Script is approved! Click "Generate YouTube SEO" above to generate Roman Hindi metadata.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: AI MODEL CENTER */}
        {activeTab === 'models' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-100">AI Model Center (07_AI_PROVIDER_MODEL_MANAGER.md)</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Server-side secret vault, model routing, and explicit permission fallback controls.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Provider Card */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 font-mono">PRIMARY ADAPTER</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                    APPROVED (D-039)
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-base">Google Gemini</h3>
                <p className="text-xs text-slate-400">
                  Integrated via official modern <code className="text-cyan-300 font-mono">@google/genai</code> TypeScript SDK.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Preferred Model:</span>
                    <span className="font-mono text-cyan-300">gemini-3.8-flash</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Alternative:</span>
                    <span className="font-mono text-slate-300">gemini-4-argon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Silent Switching:</span>
                    <span className="font-mono text-rose-400 font-bold">FORBIDDEN</span>
                  </div>
                </div>
              </div>

              {/* Secret Vault Security Card */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">SECRET VAULT</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                    ACTIVE
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-base">Server-Side Isolation</h3>
                <p className="text-xs text-slate-400">
                  All API keys are encrypted with AES-256-GCM backend-side and never sent to client bundles or logged in telemetry.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Client Exposure:</span>
                    <span className="font-mono text-emerald-400">Zero (0)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Export Scrubbing:</span>
                    <span className="font-mono text-emerald-400">Enforced</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Master Key:</span>
                    <span className="font-mono text-slate-300">Environment</span>
                  </div>
                </div>
              </div>

              {/* Fallback Permission Card */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-400 font-mono">FALLBACK POLICY</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-950 text-violet-300 border border-violet-800">
                    D-025
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-base">Permission Enforcement</h3>
                <p className="text-xs text-slate-400">
                  On primary model rate-limit or failure, the system prompts the operator for approval before calling an alternative model.
                </p>
                <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800 text-slate-400">
                  No automated or silent model swaps are permitted under the Strict Master Plan.
                </div>
              </div>
            </div>

            {/* INTERACTIVE CONTROLS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Card 1: Diagnostic Live Connection Test (07_AI_PROVIDER_MODEL_MANAGER.md §2) */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-slate-100 text-sm">Provider Diagnostic Test</h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    T-023
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Performs a live server-side roundtrip connection probe to Google Gemini. Verifies API key vault health and measures latency without client credential exposure.
                </p>

                <div className="pt-1">
                  <button
                    onClick={handleTestConnection}
                    disabled={testingConnection}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-2 shadow-lg shadow-cyan-950/40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                    <span>{testingConnection ? 'Pinging Provider...' : 'Test Gemini API Connection'}</span>
                  </button>
                </div>

                {connectionResult && (
                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    connectionResult.success 
                      ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300' 
                      : 'bg-rose-950/30 border-rose-800/60 text-rose-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center space-x-1.5">
                        {connectionResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                        <span>{connectionResult.success ? 'Connection Healthy & Verified' : 'Connection Failed'}</span>
                      </span>
                      {connectionResult.success && (
                        <span className="font-mono text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-emerald-300">
                          {connectionResult.latency_ms} ms roundtrip
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] opacity-90 font-mono">
                      {connectionResult.success
                        ? `Successfully connected to Google Gemini via modern @google/genai SDK (Model: ${connectionResult.model}).`
                        : connectionResult.error}
                    </p>

                    {connectionResult.diagnostics && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] font-mono space-y-1">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Server Secret Audit (Safe Diagnostic)
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Target Variable:</span>
                          <span className="text-cyan-400 font-semibold">{connectionResult.diagnostics.variable_name}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Present in Process:</span>
                          <span className={connectionResult.diagnostics.is_present ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                            {connectionResult.diagnostics.is_present ? 'YES' : 'NO'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Trimmed Length:</span>
                          <span className="text-slate-200">{connectionResult.diagnostics.trimmed_length} characters</span>
                        </div>
                        {connectionResult.diagnostics.format_hint && (
                          <div className={`pt-1 text-[10px] ${connectionResult.diagnostics.format_valid ? 'text-emerald-400/90' : 'text-amber-400/90'}`}>
                            {connectionResult.diagnostics.format_hint}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card 2: Project Model Configuration (T-025, T-026) */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-violet-400" />
                    <h3 className="font-bold text-slate-100 text-sm">Project Model Settings</h3>
                  </div>
                  <span className="text-[10px] font-mono text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40">
                    T-025 / T-026
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Select the primary model used for Story-to-Script, Video Prompts, Thumbnails, and SEO generation on project "{activeProject?.name || 'Active'}".
                </p>

                <div className="space-y-3 pt-1 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">Preferred Primary Model:</label>
                    <select
                      value={selectedPreferredModel}
                      onChange={(e) => setSelectedPreferredModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:border-violet-500 focus:outline-none"
                    >
                      <option value="gemini-3.8-flash">gemini-3.8-flash (Default Fast — Production Recommended)</option>
                      <option value="gemini-4-argon">gemini-4-argon (Reasoning Tier — Complex Narrative Analysis)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">Configured Alternative Model (Explicit Permission Gate):</label>
                    <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-400">
                      {selectedPreferredModel === 'gemini-3.8-flash' ? 'gemini-4-argon' : 'gemini-3.8-flash'}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      onClick={handleSaveModelSettings}
                      disabled={savingModelSettings || !activeProjectId}
                      className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-violet-950/40"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{savingModelSettings ? 'Saving Configuration...' : 'Save Model Configuration'}</span>
                    </button>

                    {modelSettingsSaved && (
                      <span className="text-xs text-emerald-400 flex items-center space-x-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Settings saved to project!</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: USAGE & HISTORY (08_UI_UX_SPEC.md §9 & 07_AI_PROVIDER_MODEL_MANAGER.md) */}
        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span>Usage & History (08_UI_UX_SPEC.md §9)</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verifiable AI request history, token consumption, honest cost labeling (Estimate / Unknown per T-030), and fallback permission audits.
                </p>
              </div>

              <div className="flex items-center space-x-2.5">
                <button
                  onClick={handleSimulateFallback}
                  title="Simulate primary model failure to test D-025 & T-026 fallback prompt"
                  className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Test Fallback Gate (T-026)</span>
                </button>

                <button
                  onClick={fetchExecutions}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${usageLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh Usage</span>
                </button>
              </div>
            </div>

            {/* PENDING FALLBACK PERMISSION MODAL / BANNER (T-026 & D-025) */}
            {pendingFallbackRequest && (
              <div className="p-5 rounded-2xl bg-amber-950/30 border-2 border-amber-500/60 space-y-3 shadow-xl shadow-amber-950/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-amber-900/60 text-amber-300 border border-amber-700">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                        <span>Model Fallback Authorization Required (T-026 / Rule D-025)</span>
                        <span className="text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-700 px-2 py-0.5 rounded">
                          NO SILENT SWAP
                        </span>
                      </h4>
                      <p className="text-xs text-amber-200/90 mt-1">
                        Primary model <code className="font-mono text-cyan-300">{pendingFallbackRequest.preferred_model}</code> encountered a failure or rate-limit (429).
                        Strict Master Plan forbids silent model substitution. Do you authorize executing this request using configured alternative model <code className="font-mono text-violet-300">{pendingFallbackRequest.alternative_model}</code>?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2 border-t border-amber-900/40">
                  <button
                    onClick={() => handleDecideFallback(false)}
                    disabled={fallbackProcessing}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
                  >
                    Decline (Preserve Prior State)
                  </button>

                  <button
                    onClick={() => handleDecideFallback(true)}
                    disabled={fallbackProcessing}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-violet-600 hover:from-amber-500 hover:to-violet-500 text-white text-xs font-bold transition cursor-pointer flex items-center space-x-2 shadow-lg shadow-amber-950/50"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${fallbackProcessing ? 'animate-spin' : ''}`} />
                    <span>Authorize Fallback to {pendingFallbackRequest.alternative_model}</span>
                  </button>
                </div>
              </div>
            )}

            {/* USAGE SUMMARY CARDS (T-030) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Requests */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Total AI Invocations</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-mono font-bold text-slate-100">{usageSummary?.total_requests || 0}</span>
                  <span className="text-xs text-slate-500">requests</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Google Gemini Adapter</span>
              </div>

              {/* Prompt Tokens */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Prompt Tokens Ingested</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-mono font-bold text-cyan-300">{(usageSummary?.total_prompt_tokens || 0).toLocaleString()}</span>
                  <span className="text-xs text-slate-500">tokens</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Grounding facts & prompts</span>
              </div>

              {/* Response Tokens */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Generated Response Tokens</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-mono font-bold text-violet-300">{(usageSummary?.total_response_tokens || 0).toLocaleString()}</span>
                  <span className="text-xs text-slate-500">tokens</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Scripts, prompts, SEO</span>
              </div>

              {/* Estimated Cost (T-030) */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Estimated Cost</span>
                  <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded">
                    T-030 Honest Mode
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-mono font-bold text-emerald-300">
                    ${(usageSummary?.total_estimated_cost_usd || 0).toFixed(6)}
                  </span>
                  <span className="text-xs text-slate-500">USD</span>
                </div>
                <span className="text-[9px] text-slate-500 block leading-tight">
                  Status: <strong>Estimate</strong> (Never fabricated exact billing)
                </span>
              </div>
            </div>

            {/* FILTER TOOLBAR */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-slate-400 text-xs">Filter by Skill:</span>
                <select
                  value={usageFilterSkill}
                  onChange={(e) => setUsageFilterSkill(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Skills</option>
                  <option value="story_to_script">Skill A: Story-to-Script</option>
                  <option value="video_prompts">Skill B: Video Prompts</option>
                  <option value="thumbnail_prompt">Skill C: Thumbnail Prompt</option>
                  <option value="youtube_seo">Skill D: YouTube SEO</option>
                </select>

                <span className="text-slate-400 text-xs ml-2">Status:</span>
                <select
                  value={usageFilterStatus}
                  onChange={(e) => setUsageFilterStatus(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="FAILED">Failed</option>
                  <option value="FALLBACK_PENDING">Fallback Pending</option>
                </select>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                Displaying {executions.length} recorded executions
              </div>
            </div>

            {/* EXECUTIONS FEED / TABLE */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 font-semibold text-xs text-slate-300 flex items-center justify-between">
                <span>Sanitized Execution Telemetry (07_AI_PROVIDER_MODEL_MANAGER.md §Usage and History)</span>
                <span className="text-[10px] font-mono text-slate-500">Secrets Scrubbed</span>
              </div>

              {executions.length === 0 ? (
                <div className="p-10 text-center text-xs text-slate-500 italic">
                  No execution records found matching current filters.
                </div>
              ) : (
                <div className="divide-y divide-slate-900">
                  {executions.map((exec) => (
                    <div key={exec.execution_id} className="p-4 hover:bg-slate-900/30 transition text-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            exec.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            exec.status === 'FALLBACK_PENDING' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}>
                            {exec.status}
                          </span>

                          <span className="font-mono text-xs font-semibold text-slate-200">
                            {exec.skill_id === 'story_to_script' ? 'Skill A (Story-to-Script)' :
                             exec.skill_id === 'video_prompts' ? 'Skill B (Video Prompts)' :
                             exec.skill_id === 'thumbnail_prompt' ? 'Skill C (Thumbnail Engine)' :
                             exec.skill_id === 'youtube_seo' ? 'Skill D (YouTube SEO)' : exec.skill_id}
                          </span>

                          <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                            {exec.model}
                          </span>

                          {exec.fallback_requested && (
                            <span className="text-[10px] font-mono bg-violet-950 text-violet-300 border border-violet-800 px-1.5 py-0.2 rounded">
                              {exec.fallback_approved ? 'Fallback Approved' : 'Fallback Declined/Pending'}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(exec.created_at).toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="text-slate-500 block text-[9px]">Prompt Tokens</span>
                          <span className="font-mono text-slate-300">{exec.prompt_tokens ? exec.prompt_tokens.toLocaleString() : 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">Response Tokens</span>
                          <span className="font-mono text-slate-300">{exec.response_tokens ? exec.response_tokens.toLocaleString() : 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">Cost ({exec.cost_display})</span>
                          <span className="font-mono text-emerald-400">
                            {exec.estimated_cost_usd !== undefined ? `$${exec.estimated_cost_usd.toFixed(6)}` : 'Unknown'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">Latency</span>
                          <span className="font-mono text-slate-400">{exec.latency_ms ? `${exec.latency_ms}ms` : 'N/A'}</span>
                        </div>
                      </div>

                      {exec.sanitized_error && (
                        <p className="text-[10px] font-mono text-rose-300 bg-rose-950/30 p-2 rounded border border-rose-900/40">
                          Error: {exec.sanitized_error}
                        </p>
                      )}

                      {exec.fallback_reason && (
                        <p className="text-[10px] font-mono text-amber-300 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                          Audit Note: {exec.fallback_reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: LIVE ACTIVITY & DIAGNOSTICS */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-100">Live Activity & Diagnostics (08_UI_UX_SPEC.md §8)</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Truthful execution logs and security audit records. No simulated progress.
                </p>
              </div>

              <button
                onClick={fetchLogs}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Logs</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs overflow-x-auto space-y-2 max-h-[600px] overflow-y-auto">
              {activityLogs.length === 0 ? (
                <div className="text-slate-500 py-6 text-center italic">No activity logged yet.</div>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-3 py-1.5 border-b border-slate-900 last:border-0">
                    <span className="text-slate-500 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold uppercase text-[10px] shrink-0 ${
                      log.level === 'warn' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      log.level === 'error' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                      log.level === 'security' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                      'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    }`}>
                      {log.action}
                    </span>
                    <span className="text-slate-300">{log.details}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW: GOVERNANCE VIEWER */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-100">Strict Master Plan Decision Register</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Governing source of truth recorded in <code className="text-cyan-400 font-mono">12_DECISION_REGISTER.md</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                    <th className="pb-3 w-20">ID</th>
                    <th className="pb-3">Decision Topic & Approved Behavior</th>
                    <th className="pb-3 w-32">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-001</td>
                    <td className="py-2.5">Four skills remain separate; original instructions and output contracts protected.</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-005</td>
                    <td className="py-2.5">Maximum six active saved projects. Oldest project deleted only upon explicit confirmation.</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-016</td>
                    <td className="py-2.5">9:16 choices: 24/32/40/48/56 seconds, exact 8 seconds per part.</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-017</td>
                    <td className="py-2.5">16:9 minimum 180 seconds; each part &gt;0 and &lt;=8 seconds.</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-019</td>
                    <td className="py-2.5">YouTube SEO engine output is always Roman Hindi (Latin alphabet).</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-036</td>
                    <td className="py-2.5">Four skill prompts provided by user; verbatim specifications frozen in /src/contracts/.</td>
                    <td className="py-2.5 font-mono text-emerald-400 font-bold">RESOLVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-037</td>
                    <td className="py-2.5">Technology Stack: Node.js 22 + TypeScript + Express + React + Tailwind CSS (Port 3000).</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-038</td>
                    <td className="py-2.5">Persistence: Firebase Firestore (Server-Side Proxy Architecture).</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-039</td>
                    <td className="py-2.5">Initial AI Provider: Google Gemini via @google/genai SDK.</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-400 font-bold">D-041</td>
                    <td className="py-2.5">Workspace Model: Choice 2 (Authenticated multi-user workspace with 6 projects per user).</td>
                    <td className="py-2.5 font-mono text-emerald-400">APPROVED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: PROJECT SETTINGS & RETENTION (SCREEN 10 / 08_UI_UX_SPEC.md §10) */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <span>Project Settings & Data Retention (Screen 10)</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure aspect ratio, duration, language, preferred model, retention policy, and permanent deletion with Section 6.2 Staleness enforcement.
                </p>
              </div>

              {activeProject && (
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-slate-500">Project ID:</span>
                  <span className="text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                    {activeProject.project_id}
                  </span>
                </div>
              )}
            </div>

            {!activeProject ? (
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center space-y-3">
                <FolderKanban className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-sm font-semibold text-slate-300">No Active Project Selected</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Please select an existing project from the Dashboard or create a new project to inspect and modify its settings.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Dynamic Section 6.2 Staleness Warning Banner */}
                {activeProject && (
                  (settingsRatio !== activeProject.aspect_ratio ||
                   settingsDuration !== activeProject.duration_seconds ||
                   settingsLanguage !== activeProject.content_language) && (
                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 flex items-start space-x-3 text-xs shadow-lg shadow-amber-950/30">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-amber-300 flex items-center space-x-1.5">
                          <span>Section 6.2 Staleness Warning</span>
                          <span className="text-[10px] bg-amber-900/60 px-1.5 py-0.2 rounded font-mono">UNSAVED SPEC CHANGES</span>
                        </h4>
                        <p className="text-slate-300 leading-relaxed">
                          You have modified the project's Aspect Ratio, Duration, or Language from its saved state.
                          Saving these changes will <strong>immediately revoke script approval (T-018)</strong> and mark all downstream
                          Video Prompts (Skill B), Thumbnail (Skill C), and YouTube SEO (Skill D) outputs as stale, requiring re-approval and regeneration.
                        </p>
                      </div>
                    </div>
                  )
                )}

                {/* Feedback Toast / Alert */}
                {settingsFeedback && (
                  <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 shadow-lg ${
                    settingsFeedback.type === 'warning'
                      ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
                      : settingsFeedback.type === 'error'
                      ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                      : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                  }`}>
                    {settingsFeedback.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                    {settingsFeedback.type === 'error' && <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    {settingsFeedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                    <div className="space-y-1">
                      <p className="font-semibold">{settingsFeedback.message}</p>
                      {settingsFeedback.invalidatedItems && settingsFeedback.invalidatedItems.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {settingsFeedback.invalidatedItems.map((item, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-amber-700/40 text-amber-300">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left 2 cols: Video Specifications & AI Model */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* General & Format Specs */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                        <Film className="w-4 h-4 text-cyan-400" />
                        <span>Video Specifications & Format Rules</span>
                      </h3>

                      {/* Project Title */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title / Name</label>
                        <input
                          type="text"
                          value={settingsName}
                          onChange={(e) => setSettingsName(e.target.value)}
                          placeholder="Project title..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
                        />
                      </div>

                      {/* Aspect Ratio Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Aspect Ratio</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setSettingsRatio('9:16');
                              setSettingsDuration(32);
                            }}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                              settingsRatio === '9:16'
                                ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200'
                                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-xs">9:16 Vertical Shorts</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">1080×1920 • Exact 8s parts</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSettingsRatio('16:9');
                              setSettingsDuration(180);
                            }}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                              settingsRatio === '16:9'
                                ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200'
                                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-bold text-xs">16:9 Landscape Video</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">1920×1080 • Min 3 min (180s)</div>
                          </button>
                        </div>
                      </div>

                      {/* Duration Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Duration ({settingsRatio === '9:16' ? 'Approved Vertical Options Only' : 'Landscape Seconds (≥180s)'})
                        </label>
                        {settingsRatio === '9:16' ? (
                          <div className="grid grid-cols-5 gap-2">
                            {[
                              { sec: 24, parts: 3 },
                              { sec: 32, parts: 4 },
                              { sec: 40, parts: 5 },
                              { sec: 48, parts: 6 },
                              { sec: 56, parts: 7 },
                            ].map((opt) => (
                              <button
                                key={opt.sec}
                                type="button"
                                onClick={() => setSettingsDuration(opt.sec)}
                                className={`p-2 rounded-lg border text-center font-mono cursor-pointer transition ${
                                  settingsDuration === opt.sec
                                    ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 font-bold'
                                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                                }`}
                              >
                                <div className="text-xs">{opt.sec}s</div>
                                <div className="text-[9px] text-slate-500">{opt.parts} pts</div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <input
                              type="number"
                              min={180}
                              step={10}
                              value={settingsDuration}
                              onChange={(e) => setSettingsDuration(Math.max(180, Number(e.target.value)))}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                            />
                            <span className="text-[10px] text-slate-500 block">
                              Duration will be divided into parts of ≤8 seconds each.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Language */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Content Language</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setSettingsLanguage('Hindi')}
                            className={`p-2.5 rounded-lg border text-xs text-left cursor-pointer transition ${
                              settingsLanguage === 'Hindi'
                                ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200 font-semibold'
                                : 'border-slate-800 bg-slate-950 text-slate-400'
                            }`}
                          >
                            <span className="font-bold block">Hindi</span>
                            <span className="text-[10px] text-slate-500">Devanagari Script & Voiceover</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSettingsLanguage('English')}
                            className={`p-2.5 rounded-lg border text-xs text-left cursor-pointer transition ${
                              settingsLanguage === 'English'
                                ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200 font-semibold'
                                : 'border-slate-800 bg-slate-950 text-slate-400'
                            }`}
                          >
                            <span className="font-bold block">English</span>
                            <span className="text-[10px] text-slate-500">Standard English Script & VO</span>
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 italic">
                          Note: YouTube SEO output (Skill D) is always generated in Roman Hindi (Latin alphabet) per Decision D-019.
                        </p>
                      </div>
                    </div>

                    {/* AI Provider & Preferred Model */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                        <Sliders className="w-4 h-4 text-violet-400" />
                        <span>AI Provider & Routing (07_AI_PROVIDER_MODEL_MANAGER.md)</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Model</label>
                          <select
                            value={settingsPreferredModel}
                            onChange={(e) => setSettingsPreferredModel(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-violet-500 cursor-pointer"
                          >
                            <option value="gemini-3.8-flash">gemini-3.8-flash (Primary Fast)</option>
                            <option value="gemini-4-argon">gemini-4-argon (High-Reasoning)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Fallback Policy</label>
                          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono">
                            Explicit Permission Gate (T-026, Rule D-025)
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500">
                        Provider keys remain server-side vaulted (AES-256-GCM). Client never receives or stores raw API credentials.
                      </p>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={handleSaveSettings}
                        disabled={savingSettings || !settingsName.trim()}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/40 transition cursor-pointer flex items-center space-x-2 disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        <span>{savingSettings ? 'Saving Settings...' : 'Save Project Settings'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right 1 col: Retention Policies & Danger Zone */}
                  <div className="space-y-6">
                    {/* Retention & Cleanup (T-032 / Phase 8) */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                        <History className="w-4 h-4 text-emerald-400" />
                        <span>Retention & Auto-Cleanup (T-032)</span>
                      </h3>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Project Retention Policy</label>
                        <select
                          value={settingsRetention}
                          onChange={(e) => setSettingsRetention(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
                        >
                          <option value="indefinite">Indefinite (Manual Deletion Only)</option>
                          <option value="auto_cleanup_30d">Auto-cleanup after 30 days</option>
                          <option value="auto_cleanup_7d">Auto-cleanup after 7 days</option>
                        </select>
                      </div>

                      <div className="flex items-start space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="autoCleanupTemp"
                          checked={settingsAutoCleanupTemp}
                          onChange={(e) => setSettingsAutoCleanupTemp(e.target.checked)}
                          className="mt-0.5 rounded border-slate-800 text-cyan-500 focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="autoCleanupTemp" className="text-xs text-slate-400 cursor-pointer">
                          Auto-purge transient model rate-limit traces and unapproved drafts
                        </label>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <button
                          onClick={handleCleanupTemp}
                          disabled={cleaningTemp}
                          className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer flex items-center justify-center space-x-1.5"
                        >
                          <RotateCcw className={`w-3.5 h-3.5 ${cleaningTemp ? 'animate-spin' : ''}`} />
                          <span>{cleaningTemp ? 'Purging...' : 'Purge Transient Caches Now'}</span>
                        </button>

                        {tempCleanupResult && (
                          <p className="mt-2 text-[10px] text-emerald-400 font-mono bg-emerald-950/30 p-2 rounded border border-emerald-900/40">
                            {tempCleanupResult}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Danger Zone: Permanent Deletion with Typed Name Confirmation (T-006 & Section 6.2) */}
                    <div className="bg-rose-950/15 border border-rose-900/40 p-6 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center space-x-2">
                        <Trash2 className="w-4 h-4 text-rose-400" />
                        <span>Danger Zone: Permanent Deletion</span>
                      </h3>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Permanently deletes this project and cleans up all linked sources, scripts, skill outputs, and execution telemetry per Section 6.2 rules.
                      </p>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-rose-950 text-xs text-slate-300">
                        <span className="text-slate-500 block text-[10px]">Type exact project title to confirm:</span>
                        <span className="font-bold text-rose-300 select-all font-mono">{activeProject.name}</span>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={deleteConfirmName}
                          onChange={(e) => setDeleteConfirmName(e.target.value)}
                          placeholder="Type exact title here..."
                          className="w-full bg-slate-950 border border-rose-900/60 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500 font-mono"
                        />
                      </div>

                      <button
                        onClick={handleDeleteProjectConfirmed}
                        disabled={deletingProjectWithConfirm || deleteConfirmName.trim() !== activeProject.name.trim()}
                        className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-rose-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{deletingProjectWithConfirm ? 'Deleting...' : 'Permanently Delete Project'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* WORKFLOW CANVAS NODE INSPECTOR MODAL (SCREEN 8 & 08_UI_UX_SPEC.md §8) */}
      {inspectingNode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border border-slate-700 w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                    <span>
                      {inspectingNode === 'source' && 'Node Inspector: Step 01 — Source Ingestion'}
                      {inspectingNode === 'script' && 'Node Inspector: Step 02 — Script Studio & Approval Gate'}
                      {inspectingNode === 'video_prompts' && 'Node Inspector: Step 03 — Video Prompts (Skill B)'}
                      {inspectingNode === 'thumbnail_prompt' && 'Node Inspector: Step 04 — AI Thumbnail Intelligence (Skill C)'}
                      {inspectingNode === 'youtube_seo' && 'Node Inspector: Step 05 — YouTube SEO Engine (Skill D)'}
                      {inspectingNode === 'models' && 'Node Inspector: Step 06 — AI Provider & Model Management'}
                      {inspectingNode === 'export' && 'Node Inspector: Step 07 — Sanitized Package Export'}
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Live execution state, runtime inputs, model routing, and output diagnostics.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingNode(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status & Gating Banner */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Node Execution State:</span>
              <span className={`font-mono font-bold px-2.5 py-0.5 rounded text-[11px] ${
                inspectingNode === 'source'
                  ? sources.length > 0 ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' : 'bg-slate-800 text-slate-400'
                  : inspectingNode === 'script'
                  ? activeProject?.script_approved ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' : currentScript ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60' : 'bg-slate-800 text-slate-400'
                  : inspectingNode === 'models'
                  ? 'bg-violet-950/60 text-violet-300 border border-violet-800/60'
                  : inspectingNode === 'export'
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
                  : skillsData[inspectingNode]?.status === 'COMPLETED'
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                  : activeProject?.script_approved
                  ? 'bg-sky-950/60 text-sky-300 border border-sky-800/60'
                  : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
              }`}>
                {inspectingNode === 'source' && (sources.length > 0 ? `v${sources.length} VALIDATED` : 'NO SOURCES')}
                {inspectingNode === 'script' && (activeProject?.script_approved ? 'APPROVED' : currentScript ? 'AWAITING APPROVAL' : 'NOT GENERATED')}
                {inspectingNode === 'models' && 'CONFIGURED & HEALTHY'}
                {inspectingNode === 'export' && 'VAULT PROTECTED'}
                {(inspectingNode === 'video_prompts' || inspectingNode === 'thumbnail_prompt' || inspectingNode === 'youtube_seo') && (
                  skillsData[inspectingNode]?.status === 'COMPLETED' ? 'COMPLETED' : activeProject?.script_approved ? 'READY TO RUN' : 'LOCKED (T-019 GATE)'
                )}
              </span>
            </div>

            {/* Downstream Gate Warning if locked */}
            {(inspectingNode === 'video_prompts' || inspectingNode === 'thumbnail_prompt' || inspectingNode === 'youtube_seo') && !activeProject?.script_approved && (
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/60 text-amber-300 text-xs flex items-center space-x-2">
                <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Downstream Gate T-019 Active: Execution blocked until operator approves current script in Script Studio.</span>
              </div>
            )}

            {/* Inspection Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Section 1: Inputs & Parameters */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] block">Runtime Inputs</span>
                {inspectingNode === 'source' && (
                  <div className="space-y-1 text-slate-400">
                    <p>Total Versions: <span className="font-mono text-cyan-300">{sources.length}</span></p>
                    <p>Latest Title: <span className="text-slate-200">{sources[sources.length - 1]?.source_title || 'None'}</span></p>
                    <p>Type: <span className="font-mono text-slate-300">{sources[sources.length - 1]?.source_type || 'N/A'}</span></p>
                  </div>
                )}
                {inspectingNode === 'script' && (
                  <div className="space-y-1 text-slate-400">
                    <p>Duration Target: <span className="font-mono text-cyan-300">{activeProject?.duration_seconds}s</span></p>
                    <p>Required Parts: <span className="font-mono text-cyan-300">{activeProject?.parts_count} parts (8s each)</span></p>
                    <p>Language: <span className="font-mono text-cyan-300">{activeProject?.content_language}</span></p>
                  </div>
                )}
                {inspectingNode === 'video_prompts' && (
                  <div className="space-y-1 text-slate-400">
                    <p>Script Parts Count: <span className="font-mono text-cyan-300">{currentScript?.parts?.length || 0}</span></p>
                    <p>Clip Duration Rule: <span className="font-mono text-cyan-300">Exact 8.0s per clip</span></p>
                    <p>Visual Continuity: <span className="text-slate-300">Camera motion & lighting cues</span></p>
                  </div>
                )}
                {inspectingNode === 'thumbnail_prompt' && (
                  <div className="space-y-1 text-slate-400">
                    <p>Input Scope: <span className="text-cyan-300">Whole Script Analysis</span></p>
                    <p>Output Rule: <span className="text-slate-300">Exactly 1 master visual prompt</span></p>
                    <p>High-CTR Elements: <span className="text-slate-300">Subject, Lighting, Focal Depth</span></p>
                  </div>
                )}
                {inspectingNode === 'youtube_seo' && (
                  <div className="space-y-1 text-slate-400">
                    <p>Language Rule: <span className="text-cyan-300 font-bold">Roman Hindi Only (D-019)</span></p>
                    <p>Package Scope: <span className="text-slate-300">Title, Description, Keywords, Tags</span></p>
                  </div>
                )}
                {inspectingNode === 'models' && (
                  <div className="space-y-1 text-slate-400">
                    <p>Provider: <span className="text-violet-300 font-semibold">Google Gemini</span></p>
                    <p>SDK: <span className="font-mono text-slate-300">@google/genai (TypeScript)</span></p>
                    <p>Fallback Policy: <span className="text-amber-300 font-mono">Permission Gated (D-025)</span></p>
                  </div>
                )}
                {inspectingNode === 'export' && (
                  <div className="space-y-1 text-slate-400">
                    <p>Bundle Type: <span className="text-cyan-300 font-mono">JSON Manifest</span></p>
                    <p>Security Audit: <span className="text-emerald-400">API Keys Scrubbed (T-024)</span></p>
                  </div>
                )}
              </div>

              {/* Section 2: Model & Vault Credentials */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] block">AI Model & Origin</span>
                <div className="space-y-1 text-slate-400">
                  <p>Active Model: <span className="font-mono text-violet-300 font-semibold">{activeProject?.preferred_model || 'gemini-3.8-flash'}</span></p>
                  <p>Alternative Model: <span className="font-mono text-slate-300">{activeProject?.alternative_models?.[0] || 'gemini-4-argon'}</span></p>
                  <p>Secret Storage: <span className="text-emerald-400 font-mono font-medium">Server AES-256 Vaulted</span></p>
                  <p>Cost Tracking: <span className="font-mono text-cyan-300">Honest Estimate (T-030)</span></p>
                </div>
                {(inspectingNode === 'script' || inspectingNode === 'video_prompts' || inspectingNode === 'thumbnail_prompt' || inspectingNode === 'youtube_seo') && (
                  <div className="pt-2 border-t border-slate-900 space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Generation Telemetry:</span>
                    {inspectingNode === 'script' && (
                      <GenerationBadge source={currentScript?.generation_source} model={currentScript?.model_used} latencyMs={currentScript?.latency_ms} tokensUsed={currentScript?.tokens_used} />
                    )}
                    {inspectingNode === 'video_prompts' && (
                      <GenerationBadge source={skillsData.video_prompts?.generation_source} model={skillsData.video_prompts?.model_used} latencyMs={skillsData.video_prompts?.latency_ms} tokensUsed={skillsData.video_prompts?.tokens_used} />
                    )}
                    {inspectingNode === 'thumbnail_prompt' && (
                      <GenerationBadge source={skillsData.thumbnail_prompt?.generation_source} model={skillsData.thumbnail_prompt?.model_used} latencyMs={skillsData.thumbnail_prompt?.latency_ms} tokensUsed={skillsData.thumbnail_prompt?.tokens_used} />
                    )}
                    {inspectingNode === 'youtube_seo' && (
                      <GenerationBadge source={skillsData.youtube_seo?.generation_source} model={skillsData.youtube_seo?.model_used} latencyMs={skillsData.youtube_seo?.latency_ms} tokensUsed={skillsData.youtube_seo?.tokens_used} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Live Output Preview */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] block">Live Output Preview</span>
              {inspectingNode === 'source' && (
                sources.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-slate-300 line-clamp-2 bg-slate-900/50 p-2.5 rounded border border-slate-800/80 font-mono text-[11px]">
                      {sources[sources.length - 1].source_content}
                    </p>
                    {sourceAnalysis && (
                      <div className="p-2.5 rounded bg-cyan-950/20 border border-cyan-800/40 text-[11px] space-y-1">
                        <span className="font-bold text-cyan-300">Analysis Status: {sourceAnalysis.status.toUpperCase()}</span>
                        <p className="text-slate-300">Topic: <span className="text-slate-100 font-semibold">{sourceAnalysis.detected_topic}</span></p>
                        <p className="text-slate-300">Angle: <span className="text-cyan-200">{sourceAnalysis.narrative_angle_recommendation}</span></p>
                        <p className="text-slate-400 font-mono">Grounding: {sourceAnalysis.key_facts?.length} facts, {sourceAnalysis.core_entities?.length} entities</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-500 italic">No source content validated yet.</p>
                )
              )}
              {inspectingNode === 'script' && (
                currentScript ? (
                  <div className="space-y-2">
                    <div className="space-y-1.5 max-h-32 overflow-y-auto font-mono text-[11px] bg-slate-900/50 p-2.5 rounded border border-slate-800/80">
                      <p className="text-cyan-300 font-bold">Script v{currentScript.script_version} ({currentScript.parts?.length} parts):</p>
                      <p className="text-slate-300 whitespace-pre-wrap">{currentScript.parts?.[0]?.voiceover}</p>
                    </div>
                    {scriptAnalysis && (
                      <div className="p-2.5 rounded bg-violet-950/20 border border-violet-800/40 text-[11px] space-y-1">
                        <span className="font-bold text-violet-300">Continuity Status: {scriptAnalysis.status.toUpperCase()}</span>
                        <p className="text-slate-300">Atmosphere: <span className="text-slate-100">{scriptAnalysis.audio_atmosphere}</span></p>
                        <p className="text-slate-400 font-mono">Pacing evaluated for {scriptAnalysis.pacing_breakdown?.length} parts ({scriptAnalysis.continuity_rules?.length} rules applied)</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-500 italic">No script generated yet.</p>
                )
              )}
              {inspectingNode === 'video_prompts' && (
                skillsData.video_prompts?.data ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto font-mono text-[11px] bg-slate-900/50 p-2.5 rounded border border-slate-800/80 text-sky-200">
                    <p className="font-bold text-cyan-300">Prompts generated for {skillsData.video_prompts.data.clip_prompts?.length} clips:</p>
                    <p className="text-slate-300">Clip 1: {skillsData.video_prompts.data.clip_prompts?.[0]?.prompt}</p>
                  </div>
                ) : (
                  <p className="text-slate-500 italic">Video prompts not yet generated.</p>
                )
              )}
              {inspectingNode === 'thumbnail_prompt' && (
                skillsData.thumbnail_prompt?.data ? (
                  <div className="space-y-1 max-h-36 overflow-y-auto font-mono text-[11px] bg-slate-900/50 p-2.5 rounded border border-slate-800/80 text-fuchsia-200">
                    <p className="font-bold text-cyan-300">Master Prompt (Angle: {skillsData.thumbnail_prompt.data.selected_thumbnail_angle}):</p>
                    <p className="text-slate-300">{skillsData.thumbnail_prompt.data.master_thumbnail_prompt}</p>
                  </div>
                ) : (
                  <p className="text-slate-500 italic">Thumbnail prompt not yet generated.</p>
                )
              )}
              {inspectingNode === 'youtube_seo' && (
                skillsData.youtube_seo?.data ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto font-mono text-[11px] bg-slate-900/50 p-2.5 rounded border border-slate-800/80 text-emerald-200">
                    <p className="font-bold text-cyan-300">Roman Hindi Title: {skillsData.youtube_seo.data.title}</p>
                    <p className="text-slate-300">Tags: {skillsData.youtube_seo.data.tags?.join(', ')}</p>
                  </div>
                ) : (
                  <p className="text-slate-500 italic">YouTube SEO not yet generated.</p>
                )
              )}
              {inspectingNode === 'models' && (
                <div className="text-[11px] font-mono text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-800/80 space-y-1">
                  <p>Provider: Google Gemini via @google/genai</p>
                  <p>Latency Benchmark: ~320ms (P95)</p>
                  <p>Rate Limit Strategy: Bounded retry with explicit operator permission gate</p>
                </div>
              )}
              {inspectingNode === 'export' && (
                <div className="text-[11px] font-mono text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-800/80 space-y-2">
                  <p>Endpoints: <span className="text-cyan-300">GET /api/projects/:id/export/zip</span> & <span className="text-cyan-300">GET /api/export/:id</span></p>
                  <p>Formats: True Multi-File ZIP Archive (sources, script, prompts, SEO, analyses) & JSON Manifest</p>
                  <p>Security Audit: Sanitized of all tokens and API keys (AES-256 vault protected)</p>
                  {activeProjectId && (
                    <div className="flex items-center space-x-2 pt-1 font-sans">
                      <button
                        onClick={() => handleExportZip(activeProjectId)}
                        className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer flex items-center space-x-1"
                      >
                        <Archive className="w-3 h-3" />
                        <span>Download Multi-File ZIP</span>
                      </button>
                      <button
                        onClick={() => handleExport(activeProjectId)}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download JSON</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setInspectingNode(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
              >
                Close Inspector
              </button>

              <button
                onClick={() => {
                  const targetTab = inspectingNode === 'video_prompts' || inspectingNode === 'thumbnail_prompt' || inspectingNode === 'youtube_seo'
                    ? 'skills'
                    : inspectingNode === 'models'
                    ? 'models'
                    : inspectingNode === 'source'
                    ? 'source'
                    : inspectingNode === 'script'
                    ? 'script'
                    : 'dashboard';
                  setActiveTab(targetTab as any);
                  setInspectingNode(null);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-cyan-950/40"
              >
                <span>Open in Dedicated Tab</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW PROJECT MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Create New Project (01_MASTER_PLAN.md §1.5)</span>
              </h2>
              <button
                onClick={() => {
                  setShowNewModal(false);
                  setOldestConflict(null);
                }}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Oldest Project Deletion Warning (T-003 / D-006) */}
            {oldestConflict && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-xs space-y-3">
                <div className="flex items-center space-x-2 text-amber-300 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Six-Project Limit Reached (Decision D-006)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Your workspace currently has 6 active projects. Creating this project requires permanently deleting the oldest project:
                </p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-amber-200">
                  "{oldestConflict.name}" ({oldestConflict.project_id})
                </div>
                <div className="flex items-center justify-end space-x-2 pt-1">
                  <button
                    onClick={() => {
                      setOldestConflict(null);
                      setShowNewModal(false);
                    }}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    Cancel Creation
                  </button>
                  <button
                    onClick={() => handleCreateProject(true)}
                    className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
                  >
                    Confirm Deletion & Create
                  </button>
                </div>
              </div>
            )}

            {!oldestConflict && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., Breakthrough in Quantum Computing"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Aspect Ratio Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Aspect Ratio</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setNewRatio('9:16');
                        setNewDuration(32);
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                        newRatio === '9:16'
                          ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">9:16 Vertical Shorts</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">1080×1920 • Exact 8s parts</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setNewRatio('16:9');
                        setNewDuration(180);
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                        newRatio === '16:9'
                          ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">16:9 Landscape Video</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">1920×1080 • Min 3 min (180s)</div>
                    </button>
                  </div>
                </div>

                {/* Duration Options per 01_MASTER_PLAN.md §1.5 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Duration ({newRatio === '9:16' ? 'Approved Vertical Options Only' : 'Minutes/Seconds'})
                  </label>
                  {newRatio === '9:16' ? (
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { sec: 24, parts: 3 },
                        { sec: 32, parts: 4 },
                        { sec: 40, parts: 5 },
                        { sec: 48, parts: 6 },
                        { sec: 56, parts: 7 },
                      ].map((opt) => (
                        <button
                          key={opt.sec}
                          type="button"
                          onClick={() => setNewDuration(opt.sec)}
                          className={`p-2 rounded-lg border text-center font-mono cursor-pointer transition ${
                            newDuration === opt.sec
                              ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 font-bold'
                              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs">{opt.sec}s</div>
                          <div className="text-[9px] text-slate-500">{opt.parts} pts</div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <input
                        type="number"
                        min={180}
                        step={10}
                        value={newDuration}
                        onChange={(e) => setNewDuration(Math.max(180, Number(e.target.value)))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                      />
                      <span className="text-[10px] text-slate-500 block">
                        Minimum 180 seconds (3 min). Parts will be divided into ≤8s segments.
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Language */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Content Language</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewLanguage('Hindi')}
                      className={`p-2.5 rounded-lg border text-xs text-left cursor-pointer transition ${
                        newLanguage === 'Hindi'
                          ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200 font-semibold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      Hindi (Devanagari Script & VO)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewLanguage('English')}
                      className={`p-2.5 rounded-lg border text-xs text-left cursor-pointer transition ${
                        newLanguage === 'English'
                          ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200 font-semibold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      English (Standard)
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCreateProject(false)}
                    disabled={!newName.trim()}
                    className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs transition"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DELETE PROJECT CONFIRMATION MODAL (Replaces window.confirm for iframe compliance) */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-rose-900/60 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800">
                <Trash2 className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Delete Project Confirmation</h3>
                <p className="text-xs text-slate-400">This action will permanently delete all associated assets.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              Are you sure you want to delete <span className="font-mono font-bold text-rose-300">"{projectToDelete.name}"</span>?
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-rose-950/50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FALLBACK PROMPT MODAL / BANNER (Transparent Provider Rate/Billing Fallback) */}
      {fallbackPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-cyan-900/60 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800 shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-100 text-sm">External Provider Notice</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Transparent Execution
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  The upstream Gemini API encountered a rate limit or billing tier requirement:
                </p>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300/90 break-words">
                  {fallbackPrompt.error}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <p className="font-semibold text-slate-200">Deterministic Engine Fallback Available:</p>
              <p className="text-[11px] text-slate-400">
                You can run the generator using the built-in deterministic fallback engine. It generates fully compliant outputs tagged as <code className="text-cyan-300 font-mono">mock_fallback</code> so your complete workflow and acceptance tests proceed seamlessly.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setFallbackPrompt(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Dismiss Notice
              </button>
              <button
                onClick={() => {
                  const s = fallbackPrompt.skill;
                  setFallbackPrompt(null);
                  if (s === 'script') handleGenerateScript(true);
                  else if (s === 'video') handleGenerateVideoPrompts(true);
                  else if (s === 'thumbnail') handleGenerateThumbnail(true);
                  else if (s === 'seo') handleGenerateSeo(true);
                  else if (s === 'pipeline') handleRunFullPipeline(true);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-cyan-950/50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Execute High-Fidelity Fallback</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP TOAST NOTIFICATIONS (No window.alert) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slide-in">
          <div className={`p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start space-x-3 ${
            toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-800/80 text-rose-200'
              : toast.type === 'warning'
              ? 'bg-amber-950/90 border-amber-800/80 text-amber-200'
              : toast.type === 'info'
              ? 'bg-sky-950/90 border-sky-800/80 text-sky-200'
              : 'bg-emerald-950/90 border-emerald-800/80 text-emerald-200'
          }`}>
            <div className="shrink-0 mt-0.5">
              {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {toast.type === 'info' && <ShieldCheck className="w-4 h-4 text-sky-400" />}
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-xs">{toast.title}</h5>
              <p className="text-[11px] opacity-90 mt-0.5 break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="shrink-0 text-slate-400 hover:text-slate-100 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
