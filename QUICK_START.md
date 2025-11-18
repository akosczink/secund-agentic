# 🚀 QUICK START — SECUND Agentic Engine

This guide helps you run the dignity-first, burnout-prevention agent in **under 60 seconds**.

---

# 1️⃣ Install dependencies

```bash
git clone https://github.com/akosczink/secund-agentic
cd secund-agentic
npm install
2️⃣ Run the demo loop
The repo contains a runnable example that executes the retention/burnout prediction loop.
npm run demo
Expected output:
{
  "risk": 0.41,
  "recommendation": "Check in with employee — negative sentiment trend",
  "loopsEngaged": [
    "Burnout Early Warning Loop",
    "Sentiment Loop",
    "Workload Equity Loop"
  ]
}
3️⃣ Use the agent in your own code
import { retentionAgent } from "./src/retention-agent";

async function main() {
  const signal = {
    employeeId: "demo-123",
    performance: 0.74,
    burnoutRisk: 0.42,
    sentimentScore: -0.10,
    workload: 0.81,
    motivation: 0.55,
    fairnessScore: 0.92
  };

  const result = await retentionAgent(signal);
  console.log(result);
}

main();
4️⃣ File structure overview
/
├── BOOK_OF_LOOPS.md
├── QUICK_START.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
│
├── src/
│   ├── agentic-retention-loop.ts
│   ├── retention-agent.ts
│   ├── demo.ts
│   └── loops/   (reserved)
│
└── package.json
5️⃣ Next steps (optional)
⭐ Star the repo
✏️ Open an Issue with your ideas
🧪 Try modifying a loop and see the results
🤝 Contact for pilot testing: akos.czink@gmail.com
🔥 Your agent is now running.
Dignity → Insight → Action → Reflection → Improvement → Infinity
