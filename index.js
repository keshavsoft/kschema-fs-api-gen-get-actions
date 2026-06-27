import getLatestVersion from "./bin/core/getLatestVersion.js";

const load = async (cmd) => {
    const module = await import(`./bin/${getLatestVersion()}/tasks/actions/${cmd}.js`);

    return module.default; // Returns a function
};

const find = async ({ toPath, showLog, inTargetPath, inGenerateRest }) => {
    const commandToSend = "find";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: commandToSend, inGenerateRest
    });
};

const filterQuery = async ({ toPath, showLog, inTargetPath, inGenerateRest }) => {
    const commandToSend = "filterQuery";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: commandToSend, inGenerateRest
    });
};

const lastRecord = async ({ toPath, showLog, inTargetPath, inGenerateRest }) => {
    const commandToSend = "lastRecord";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: commandToSend, inGenerateRest,
        showLog
    });
};

export {
    showAll, find, filterQuery, lastRecord
};