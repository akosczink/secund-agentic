import { retentionAgent } from "./src/retention-agent";
import { AgentSignal } from "./src/types";

async function main() {
  console.log("🚀 SECUND AGENTIC ENGINE STARTING...");

  const signal: AgentSignal = {
    employeeId: "john.doe@company.com",
    performance: 0.85,
    burnoutRisk: 0.41,
    sentimentScore: -0.12,
    workload: 0.88,
    motivation: 0.5
  };

  const result = await retentionAgent(signal);
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
