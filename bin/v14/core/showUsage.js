/*
KSchema CLI – Execution Flow

1. Parse terminal input
2. Show usage if command/help missing
3. Resolve command dynamically
4. Load command dynamically
5. Execute action

Architecture Goals:
- JSON driven command system
- Zero hardcoded command maps
- Single source of truth
- Easy scalability
- Beginner friendly structure
*/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function showUsage(version) {
  const g = "\x1b[32m";
  const y = "\x1b[33m";
  const c = "\x1b[36m";
  const gray = "\x1b[90m";
  const r = "\x1b[0m";

  const actionsDir = path.join(__dirname, "../tasks/actions");
  const files = fs.readdirSync(actionsDir)
    .filter(f => f.endsWith(".js"))
    .map(f => f.slice(0, -3));

  const commandsText = files.map((name) => {
    return `  ${g}${name}${r}     Generate ${name} GET action`;
  }).join("\n");

  const examplesText = files.map((name) => {
    return `  ${gray}npx kschema-fs-api-gen-get-actions ${name}${r}`;
  }).join("\n");

  console.log(`
${c}🚀 KSchema Api Generator v${version}${r}

${y}Usage:${r}
  ${g}npx kschema-fs-api-gen-get-actions${r} <command> [options]

${y}Commands:${r}
${commandsText}

${y}Examples:${r}
${examplesText}

${y}Tip:${r}
  ${gray}npm i -g kschema-fs-api-gen-get-actions${r}
`);
}