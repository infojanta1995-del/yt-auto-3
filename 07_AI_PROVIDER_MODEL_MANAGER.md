# 7. AI PROVIDER & MODEL MANAGER

## Purpose and boundary
A shared execution/routing service for the four skills. It does not replace skill logic. It resolves project model settings, checks eligibility, executes the request, validates the response, and returns it to the calling skill.

## Provider connection lifecycle
1. Choose provider.
2. Enter credentials/authentication in secure UI.
3. Send credentials only over HTTPS to authorized backend.
4. Encrypt and store server-side.
5. Test connection.
6. Fetch official model list if provider supports it.
7. Show known capabilities and unknowns honestly.
8. User selects project preferred model and alternatives.
9. Save settings; later requests use the saved project configuration.

## Supported-provider rule
Potential providers discussed: Google Gemini, OpenAI, Groq, OpenRouter, Mistral, NVIDIA, DeepSeek, custom compatible provider. These are candidates only. Mark `Supported` only after adapter implementation and tests. Never infer model access from catalog presence alone.

## Adapter contract
Where supported, adapters expose:
- connection validation;
- model listing/refresh;
- model/capability metadata;
- request execution;
- normalized errors;
- usage/quota information only when the provider exposes it.

Use documented official endpoints where available. If a static catalog is needed, label its source and last checked date. Unknown metadata stays `Unknown`.

## Routing
- Project-level preferred model and alternatives.
- Check connection, model eligibility, capabilities, schema needs, and policy before execution.
- On failure, explain the issue and ask permission before using an alternative model.
- No silent switching, no infinite retry loops, no unapproved per-skill routing complexity.
- Safe transient retries may retry the same model within bounded limits.
- Invalid key, permission/region/plan issue, billing issue, or model-not-found requires appropriate remediation, not blind retries.
- Alternative output must pass the same skill schema and validation.
- Handle timeout duplicate-generation risk carefully.

## Credential security
- Backend encryption, e.g. AES-256-GCM, with master key outside the database in a secret manager/environment.
- Never send saved full secrets back to frontend; mask them.
- Never log, export, place in URLs, or bundle keys in client-side code.
- Use HTTPS, access control, redaction, rotation, disconnect, and secure deletion.
- Never claim absolute security without evidence and review.

## Usage and history
Track request counts/tokens where available. Actual cost only if reliable; otherwise `Estimate` or `Unknown`. Actual quota/reset only when provider exposes it; otherwise `Unknown`.
Sanitized execution record: project ID, skill ID, provider/model, timestamps, status, attempts, sanitized error, usage, fallback reason.

## Error handling
| Error | Required behavior |
|---|---|
| Invalid request/schema | Correct request/config or report failure; don't switch silently |
| 401 | Explain credential issue; let user fix/rotate |
| 403 | Explain access/plan/region permission issue |
| 429 | Follow reset/Retry-After; ask permission before alternative |
| 5xx/network | Bounded same-model retry if safe; then report/ask |
| Timeout | Explain uncertain completion risk; avoid duplicate expensive run where possible |
| Model not found | Refresh catalog/check configuration; no blind retries |
| All candidates fail | Honest error; preserve prior valid outputs |

## Required screens
- Providers & Connections
- Model Catalog
- Model Routing (project preferred model + alternatives)
- Usage & History
- Security / credential controls
