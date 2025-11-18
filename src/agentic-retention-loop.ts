export type EmployeeSignal = {
  stress: number
  workload: number
  socialSupport: number
  sleepQuality: number
}

export type AgentDecision =
  | { action: "INTERVENE"; message: string }
  | { action: "WAIT"; reason: string }

export class RetentionAgent {
  predict(signal: EmployeeSignal): number {
    const risk =
      signal.stress * 0.35 +
      signal.workload * 0.35 +
      (1 - signal.socialSupport) * 0.2 +
      (1 - signal.sleepQuality) * 0.1

    return Math.min(1, Math.max(0, risk))
  }

  intervene(risk: number): AgentDecision {
    if (risk > 0.75) {
      return {
        action: "INTERVENE",
        message:
          "High burnout risk detected → Initiating dignity-first outreach."
      }
    }

    if (risk > 0.55) {
      return {
        action: "INTERVENE",
        message: "Moderate risk → Recommend optional check-in message."
      }
    }

    return {
      action: "WAIT",
      reason: "Risk below threshold → No action."
    }
  }

  reflect(result: "SUCCESS" | "IGNORE" | "NEGATIVE"): string {
    if (result === "SUCCESS") return "Loop improvement: keep strategy."
    if (result === "IGNORE") return "Adjust message tone and timing."
    return "Warning: downgrade intervention intensity."
  }
}

// --- DEMO EXECUTION ---
const agent = new RetentionAgent()

const mock: EmployeeSignal = {
  stress: 0.82,
  workload: 0.75,
  socialSupport: 0.41,
  sleepQuality: 0.52
}

const risk = agent.predict(mock)
const decision = agent.intervene(risk)
const reflection = agent.reflect("SUCCESS")

console.log({ risk, decision, reflection })
