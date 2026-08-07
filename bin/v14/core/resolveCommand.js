import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function resolveCommand(cmd) {
    const actionsDir = path.join(__dirname, "../tasks/actions");
    const files = fs.readdirSync(actionsDir);
    
    const matchedFile = files.find(f => f.toLowerCase() === `${cmd.toLowerCase()}.js`);
    if (!matchedFile) return null;

    const module = await import(`../tasks/actions/${matchedFile}`);
    return module.default;
};