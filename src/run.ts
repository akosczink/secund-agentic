import { RetentionAgent, EmployeeSignal } from "./retention-agent";

function main() {
  const signal: EmployeeSignal = {
    stress: 0.7,
    engagement: 0.4,
    performance: 0.6,
    recent_conflicts: 2,
  };

  console.log("=== SECUND Agentic Retention Loop v0.1 ===");
  console.log("Input:", signal);

  const result = RetentionAgent(signal);

  console.log("Result:", result);
}

main();
