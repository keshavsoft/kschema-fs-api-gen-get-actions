import path from "path";
import { fileURLToPath } from "url";

import { showAll } from "../../../index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

showAll({
    toPath: __dirname,
    inGenerateRest: true,
    inFolderName: "tab1"
});