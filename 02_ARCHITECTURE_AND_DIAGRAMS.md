# 2. ARCHITECTURE AND VISUAL DIAGRAMS

## 2.1 High-level architecture

```mermaid
flowchart TD
    U[User] --> UI[AI Studio UI / Project Workspace]
    UI --> PM[Project Manager]
    PM --> DB[(Project Data Store)]
    UI --> SRC[Source Adding Panel]
    SRC --> SA[Source Validation + Source Analysis]
    SA --> DB
    UI --> SW[Script Studio]
    SW --> SS[Story-to-Script Skill]
    SS --> VAL[Script + Schema + Duration Validation]
    VAL --> DB
    DB --> AP[Approval Gate]
    AP -->|Approved current script| ROUTER[Skill Orchestrator]
    ROUTER --> VP[Script-to-Video Prompt Skill]
    ROUTER --> TH[Thumbnail Prompt Skill]
    ROUTER --> SEO[YouTube SEO Skill]
    VP --> VAL2[Output Validation]
    TH --> VAL2
    SEO --> VAL2
    VAL2 --> DB
    ROUTER --> MGR[AI Provider & Model Manager]
    MGR --> VAULT[Backend Secret Vault]
    MGR --> CAT[Model Catalog / Capability Check]
    MGR --> EXEC[Provider Adapter / Execution]
    EXEC --> EXT[External AI Provider]
    EXT --> EXEC
    EXEC --> MGR
    MGR --> ROUTER
    UI --> JOB[Job / Progress / Retry Manager]
    JOB --> MGR
    DB --> EXP[Project ZIP Export]
    UI --> DEL[Confirmed Permanent Delete]
```

## 2.2 New project and source-to-script workflow

```mermaid
flowchart TD
    A[Dashboard] --> B[Create New Project]
    B --> C[Choose Aspect Ratio: 9:16 or 16:9]
    C --> D{Aspect Ratio?}
    D -->|9:16| E[Choose 24 / 32 / 40 / 48 / 56 sec]
    D -->|16:9| F[Enter duration: minimum 180 sec]
    E --> G[Choose content language: Hindi / English]
    F --> G
    G --> H[Save Project Settings]
    H --> I[Open Source Adding Panel]
    I --> J[Add / Edit Source]
    J --> K[Save Source]
    K --> L{Source readable and validated?}
    L -->|No| M[Show reason; ask for pasted content/fix]
    M --> J
    L -->|Yes| N[Generate Script]
    N --> O[Run Story-to-Script analysis]
    O --> P[Generate and validate script]
    P --> Q{Validation passed?}
    Q -->|No| R[Targeted correction or clear failure]
    R --> P
    Q -->|Yes| S[Save latest script + analysis]
    S --> T[User reviews script]
    T --> U{User approves?}
    U -->|No| V[Edit/regenerate; validate; require approval again]
    V --> T
    U -->|Yes| W[Enable downstream skills]
```

## 2.3 Approved script to three downstream skills

```mermaid
flowchart TD
    A[Current Script] --> B{Approved for current version/settings?}
    B -->|No| C[Disable downstream buttons]
    B -->|Yes| D[Skill Control Center]
    D --> E[Script-to-Video Prompts]
    D --> F[Thumbnail Prompt: whole script]
    D --> G[YouTube SEO: Roman Hindi always]
    E --> H[Validate ratio, duration, script fidelity, schema]
    F --> I[Validate whole-script grounding and ratio]
    G --> J[Validate project/version, source/script grounding, Roman Hindi]
    H --> K[Save result/status]
    I --> K
    J --> K
```

## 2.4 Provider request and permission-based fallback

```mermaid
flowchart TD
    A[Skill request] --> B[Resolve project model settings]
    B --> C[Check connection, model, capabilities, policy]
    C -->|Ineligible| D[Explain issue; do not blindly execute]
    C -->|Eligible| E[Execute preferred model]
    E --> F{Request succeeded and schema valid?}
    F -->|Yes| G[Return validated result to skill]
    F -->|No| H[Classify error]
    H --> I{Safe transient error?}
    I -->|Yes| J[Bounded retry on same model if safe]
    I -->|No| K[Show actionable failure]
    J --> F
    K --> L{Alternative model may help?}
    L -->|No| M[Stop with honest error]
    L -->|Yes| N[Notify user and ask permission]
    N -->|Declined| M
    N -->|Approved| O[Check alternative eligibility]
    O --> P[Run alternative; validate schema]
    P --> Q[Return result or report failure]
```

## 2.5 Project lifecycle and deletion guard

```mermaid
flowchart TD
    A[Create project request] --> B{Active projects < 6?}
    B -->|Yes| C[Create fresh project ID]
    B -->|No| D[Identify oldest by created_at]
    D --> E[Show deletion notice and ask confirmation]
    E -->|Cancel| F[Keep all 6; do not create]
    E -->|Confirm| G[Atomic/recoverable deletion + creation]
    G --> H{Operation succeeded?}
    H -->|Yes| I[New project created; old project permanently deleted]
    H -->|No| J[Preserve data / recover safely; report failure]
```

## 2.6 Implementation and review loop

```mermaid
flowchart LR
    A[Pick one scoped phase] --> B[Google AI Studio states plan and files to change]
    B --> C{Within approved scope?}
    C -->|No| D[Reject; request revised approach]
    C -->|Yes| E[Implement only that phase]
    E --> F[Run tests and show diffs]
    F --> G[Paste reply, diff, test output to ChatGPT]
    G --> H[Compliance review]
    H --> I{Tests and plan checks pass?}
    I -->|No| J[Fix within scope; log failure]
    J --> F
    I -->|Yes| K[Update tracker; approve next phase]
    K --> A
```

## 2.7 UI navigation map

```mermaid
flowchart TD
    D[Dashboard] --> NP[New Project]
    D --> PW[Project Workspace]
    PW --> SA[Source Workspace / Source Adding Panel]
    PW --> SS[Script Studio]
    PW --> SC[Skill Control Center]
    PW --> AM[AI Model Center]
    D --> LA[Live Activity Center]
    D --> UH[Usage & History]
    D --> PS[Project Settings]
    D --> EX[Export Project ZIP]
```

## 2.8 Requirement traceability
Every implementation task should reference:
- requirement ID in `09_TEST_AND_ACCEPTANCE_MATRIX.md`;
- roadmap phase in `11_IMPLEMENTATION_ROADMAP.md`;
- files/components changed;
- test command and result;
- status/evidence in `03_BUILD_STATUS_AND_TRACKER.md` and `14_CHANGELOG_AND_PROGRESS_LOG.md`.
