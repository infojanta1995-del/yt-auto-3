# 10. CHATGPT ↔ GOOGLE AI STUDIO HANDOFF PROTOCOL

## Purpose
There is no automatic sync connection established by this package. The working sync is a controlled manual loop: Google AI Studio response → paste into ChatGPT → review → update tracker → next approved task.

## One task at a time
Do not ask Google AI Studio to build the entire app in one unconstrained prompt. Give it one phase/task at a time from `11_IMPLEMENTATION_ROADMAP.md`.

## Before asking Google AI Studio to code
Ask it to:
1. Read the Master Plan and Strict Compliance Rules.
2. Identify the exact requirements and acceptance tests for this task.
3. Inspect existing files and describe the current state.
4. List proposed files to modify/create and why.
5. Identify missing requirements/conflicts/technical limitations.
6. Wait for user approval if scope changes are needed.
7. Implement only the approved task.

## What to paste back into ChatGPT
Paste the full Google AI Studio reply, including:
- its scope interpretation;
- files read/created/modified;
- diffs or relevant code;
- commands run;
- actual test output;
- known limitations/errors;
- questions requiring a decision.

Do not paste API keys, access tokens, passwords, private credentials, or other secrets.

## ChatGPT review checklist
ChatGPT should compare the reply/code/tests with:
- `01_MASTER_PLAN.md`
- `04_STRICT_COMPLIANCE_RULES.md`
- `05_SKILL_CONTRACTS.md`
- `09_TEST_AND_ACCEPTANCE_MATRIX.md`
- `11_IMPLEMENTATION_ROADMAP.md`

Then return:
1. Verdict: ACCEPT / REVISE / BLOCKED.
2. Requirements satisfied and evidence.
3. Plan deviations or risks.
4. Missing tests/evidence.
5. Exact next action, scoped to one task.
6. Tracker/log update suggestion.

## Standard handoff block
Paste this template with each Google AI Studio response:

```text
PROJECT: AI Studio Strict Master Plan
TASK ID:
ROADMAP PHASE:
REQUIREMENT IDs:
GOOGLE AI STUDIO RESPONSE:
[Paste full response]

CHANGED FILES / DIFF:
[Paste changed-file list and diff]

TESTS RUN:
[Commands and exact output]

KNOWN ISSUES:
[Errors, limitations, uncertainties]

DO NOT INCLUDE SECRETS.
CHATGPT REVIEW REQUEST:
Check strict plan compliance, code correctness, security, regression risk, acceptance-test evidence, and recommend only the next approved task.
```

## Sync status
- Package-based manual handoff: defined.
- Automatic live synchronization: not configured or claimed.
- Shared current state: maintain `03_BUILD_STATUS_AND_TRACKER.md`, `12_DECISION_REGISTER.md`, and `14_CHANGELOG_AND_PROGRESS_LOG.md` and pass their latest versions between tools.
