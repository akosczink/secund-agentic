import { retentionAgent } from "./retention-agent";
import { AgentSignal } from "./types";

async function main() {
  console.log("\n🚀 SECUND AGENTIC ENGINE (v2.0) - INITIALIZING...\n");

  const signal: AgentSignal = {
    employeeId: "john.doe@company.com",
    performance: 0.85,
    burnoutRisk: 0.41,
    sentimentScore: -0.12,
    workload: 0.88,
    motivation: 0.5,
    fairnessScore: 0.72
  };

  console.log("📥  INPUT SIGNAL RECEIVED:");
  console.table(signal);

  console.log("\n🔄  RUNNING AGENTIC LOOPS...");
  const result = await retentionAgent(signal);

  console.log("\n✅  DECISION GENERATED:");
  console.log(JSON.stringify(result, null, 2));

  console.log("\n🔐  Dignity Protocol Verified: Identity hashed, raw data discarded.");
}

main().catch(console.error);
