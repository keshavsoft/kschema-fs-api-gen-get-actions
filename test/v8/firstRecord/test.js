import { firstRecord } from "../../../index.js";

firstRecord({
    toPath: process.cwd(),
    showLog: true,
    inGenerateRest: true,
    inPort: 8888,
    inFolderName: "fold1"
});