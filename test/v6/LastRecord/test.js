import { lastRecord } from "../../../index.js";

lastRecord({
    toPath: process.cwd(),
    showLog: true,
    inGenerateRest: true,
    inPort: 8888
});