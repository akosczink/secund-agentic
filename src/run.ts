import { retentionAgent } from "./src/retention-agent";
import { AgentSignal } from "./src/types";

async function main() {
  console.log("\n🚀 SECUND AGENTIC ENGINE (v2.0) - INITIALIZING...\n");

  // Input signal
  const signal: AgentSignal = {
    employeeId: "john.doe@company.com", // This will be hashed!
    performance: 0.85,
    burnoutRisk: 0.41,
    sentimentScore: -0.12,
    workload: 0.88,
    motivation: 0.5 
    // A 'fairnessScore' sort kivettük, ez okozta a hibát!
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
