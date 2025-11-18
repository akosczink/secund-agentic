# DEMO_GUIDE.md
SECUND Agentic Engine — Demo Guide  
Version 1.0 — November 2025

---

# 🎬 Purpose of This Demo

The demo shows **exactly how the agent thinks**:

1. Collects a signal  
2. Evaluates burnout & retention risk  
3. Generates a dignity-first recommendation  
4. Lists which loops were activated  

It is deterministic and safe to run in any environment.

---

# ▶️ 1. Run the Demo

```bash
npm install
npm run demo
Expected sample output:
{
  "risk": 0.41,
  "recommendation": "Check in with employee — negative sentiment trend",
  "loopsEngaged": [
    "Burnout Early Warning Loop",
    "Sentiment Loop",
    "Workload Equity Loop"
  ]
}
