import path from "path";
import { fileURLToPath } from "url";

import { find } from "../../../index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

find({
    toPath: __dirname
});