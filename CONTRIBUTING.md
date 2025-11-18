Contributing to SECUND Agentic
Thank you for your interest in contributing!
SECUND is a dignity-first, human-protective decision engine — and we welcome improvements from developers, researchers, and ethical technologists.
🧩 How to Contribute
1. Fork the repository
Click Fork in the top-right corner.
2. Create a feature branch
git checkout -b feature/your-feature-name
3. Make your changes
Follow these rules:
keep contributions dignity-first
no surveillance features
no keystroke/screen tracking
respect the architecture in BOOK_OF_LOOPS.md
TypeScript only (strict mode)
4. Run lint & type checks
npm install
npm run build
5. Submit a Pull Request
Use the template:
Title:
feat: <short description>
Description:
what you changed
why it matters
which loop(s) or module(s) it impacts
We respond within 48 hours.
📜 Coding Guidelines
Prefer pure functions
Avoid shared mutable state
Loops must follow the structure:
Trigger → Sense → Evaluate → Decide → Act → Reflect → Improve
Avoid external dependencies unless necessary
No silent failures — throw explicit errors
Ensure all logic is deterministic → zero tofu
🧪 Testing
All new features should include:
unit tests (Vitest / Jest)
deterministic outputs
mock-safe examples
If you add a new decision loop, include:
loop-name.spec.ts
🛡 Ethical Requirements (Non-Optional)
SECUND will never accept contributions that introduce:
surveillance
manipulation
psychological pressure
productivity-policing
intrusive tracking
Any such PR is rejected instantly.
👥 Communication
For questions, discussions, or collaboration:
GitHub Issues (preferred)
Email: akos.czink@gmail.com
❤️ Thank You
By contributing, you help build the world’s first dignity-first decision engine.
Your work directly helps protect real people from burnout and harm.
