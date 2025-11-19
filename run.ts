import { retentionAgent } from "./src/retention-agent";

async function main() {
  console.log("SECUND v0.1 – Dignity-First Agentic Demo\n");

  const result = await retentionAgent({
    employeeId: "demo-123",
    burnoutRisk: 0.68,
    sentimentScore: -0.22,
    workload: 0.89,
    motivation: 0.38,
    fairnessScore: 0.74,
  });

  console.log(JSON.stringify(result, null, 2));
  console.log("\nZero surveillance. Only dignity.\n");
}

main();
