# API_REFERENCE.md  
**SECUND Agentic Engine — TypeScript API Reference**  
Version 1.0 — November 2025

This document describes the public API surface of the **SECUND Agentic Engine**  
(as exposed by the `agentic-retention` package).

---

## 📦 Package

```ts
import {
  retentionAgent,
  agenticRetentionLoop,
  type RetentionSignal,
  type RetentionResult,
  type AgenticOptions,
} from "agentic-retention";
🧾 1. Types
RetentionSignal
The minimal input required to evaluate burnout / retention risk.
export interface RetentionSignal {
  employeeId: string;

  /** 0–1 — estimated burnout probability */
  burnoutRisk: number;

  /** -1–1 — aggregated sentiment (negative → positive) */
  sentimentScore: number;

  /** 0–1 — workload intensity (0 = underloaded, 1 = overloaded) */
  workload: number;

  /** 0–1 — motivation/engagement (1 = highly motivated) */
  motivation?: number;

  /** 0–1 — perceived leadership fit (1 = excellent) */
  leadershipFit?: number;

  /** 0–1 — perceived fairness (1 = fully fair) */
  fairnessScore?: number;

  /** Free-form metadata (team, location, etc.) */
  meta?: Record<string, unknown>;
}
RetentionResult
The canonical output of the engine.
export interface RetentionResult {
  /** 0–1 — overall retention / burnout risk */
  risk: number;

  /** Human-readable recommendation string */
  recommendation: string;

  /** Raw loop-level signals used in the decision */
  loopSignals: Record<string, unknown>;

  /** Names of loops that were activated */
  loopsEngaged: string[];

  /** Optional debug information (only when enabled) */
  debug?: {
    weights?: Record<string, number>;
    intermediateScores?: Record<string, number>;
  };
}
AgenticOptions
Optional configuration for advanced use.
export interface AgenticOptions {
  /** "default" | "secund-os" — engine mode (default: "default") */
  mode?: "default" | "secund-os";

  /** If true, includes extra debug information in the result */
  debug?: boolean;

  /** Explicitly select loops by name (otherwise auto-select) */
  includeLoops?: string[];

  /** Exclude specific loops by name */
  excludeLoops?: string[];
}
⚙️ 2. Functions
2.1 retentionAgent(signal, options?)
High-level, opinionated API.
Runs the full agentic pipeline and returns a RetentionResult.
import { retentionAgent } from "agentic-retention";

const signal: RetentionSignal = {
  employeeId: "demo-1",
  burnoutRisk: 0.41,
  sentimentScore: -0.12,
  workload: 0.88,
  motivation: 0.55,
  fairnessScore: 0.92,
};

const result = await retentionAgent(signal, {
  mode: "secund-os",
  debug: true,
});

console.log(result.risk, result.recommendation);
Parameters
signal: RetentionSignal – required input payload
options?: AgenticOptions – optional configuration
Returns
Promise<RetentionResult>
2.2 agenticRetentionLoop(signal)
Low-level functional API that implements the core risk computation.
This maps 1:1 to the architecture described in BOOK_OF_LOOPS.md.
import { agenticRetentionLoop } from "agentic-retention";

const coreResult = await agenticRetentionLoop(signal);

console.log(coreResult.risk, coreResult.loopsEngaged);
Parameters
signal: RetentionSignal
Returns
Promise<RetentionResult>
Use this when you want full control over orchestration, logging, or
when embedding the model inside your own higher-level agent.
🔍 3. Error Handling
All public functions are async and may reject with an Error when:
required fields in RetentionSignal are missing
numeric values fall outside expected ranges
internal computation fails (rare, treated as a bug)
Recommended pattern:
try {
  const result = await retentionAgent(signal);
  // handle result
} catch (err) {
  console.error("SECUND Agentic Engine error:", err);
  // fallback behaviour (e.g., default recommendation)
}
🧪 4. Demo Script
The repository includes a runnable demo:
npm install
npm run demo
src/demo.ts shows a minimal end-to-end example using retentionAgent.
🧩 5. Extension Points
Planned extension hooks (non-breaking, may be added in future versions):
custom weighting strategies
loop-level plug-ins
external telemetry callbacks (for logging/metrics)
These will be exposed under a separate experimental namespace to keep
the core API stable.
🏁 6. Stability & Versioning
The RetentionSignal, RetentionResult, and the two public functions:
retentionAgent
agenticRetentionLoop
are semver-stable starting from v1.0.0.
Breaking changes will only occur in a new major version and will be
documented in CHANGELOG.md.

For integration examples, see INTEGRATIONS.md.
For conceptual background, see BOOK_OF_LOOPS.md and ARCHITECTURE.md.

