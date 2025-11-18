🚀 QUICK START — SECUND Agentic Engine
Run the dignity-first, burnout-prevention agent in under 60 seconds.
1️⃣ Install & setup
git clone https://github.com/akosczink/secund-agentic
cd secund-agentic
npm install
2️⃣ Run the demo loop
A runnable example is included to demonstrate the
retention/burnout prediction workflow.
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
4️⃣ Repository structure
/
├── BOOK_OF_LOOPS.md           # full architecture
├── QUICK_START.md             # this file
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
│
├── src/
│   ├── agentic-retention-loop.ts   # core decision loop (v0.1)
│   ├── retention-agent.ts          # high-level wrapper
│   ├── demo.ts                     # runnable example
│   └── loops/                      # reserved for future expansion
│
└── package.json
5️⃣ Next steps (optional)
⭐ Star the repository
🧪 Modify a loop and observe the behaviour
📝 Open an Issue with improvement ideas
🤝 For pilot testing: akos.czink@gmail.com
🔁 SECUND Agentic Mantra
Dignity → Insight → Action → Reflection → Improvement → Infinity
