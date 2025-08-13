# automation-playwright.dev
Playwright experiment
## Zero step
- add zerostep dependency
- Key in zerostep.config.json
## Ollama
- Add ollama dependency: npm install ollama
- Install Ollama to local https://ollama.com/download
- Perform start locally Ollama, ensure rụnning (check cmd: curl http://localhost:11434)
- To read image from ollama, run "ollama run llava"

## Run specific test with debug
- npx playwright test src/tests/{path}.test.ts --debug

## Run specific test without debug
- npx playwright test src/tests/{path}.test.ts

## Reporter
- npx playwright test --reporter=allure-playwright
- npx playwright test src/tests/{path}.test.ts --reporter=allure-playwright