import { RetentionAgent } from "./retention-agent";
import { runRetentionLoop } from "./agentic-retention-loop";

async function main() {
  console.log("=== SECUND Retention Engine v1 ===");

  // Sample employee signal
  const signal = {
    stress: 0.62,
    engagement: 0.55,
    performance: 0.70,
    recent_conflicts: 1
  };

  console.log("\nInput:", signal);

  const assessment = RetentionAgent(signal);
  console.log("\nAssessment:", assessment);

  console.log("\nRunning agentic decision loop...");
  const loopResult = await runRetentionLoop(signal);

  console.log("\n=== Loop Result ===");
  console.log(loopResult);
}

main();
