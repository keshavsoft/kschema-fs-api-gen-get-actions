import getLatestVersion from "./bin/core/getLatestVersion.js";

const load = async (cmd) => {
    const module = await import(`./bin/${getLatestVersion()}/tasks/actions/${cmd}.js`);

    return module.default; // Returns a function
};

const find = async ({ toPath, showLog, inTargetPath, inGenerateRest,
    inPort
}) => {

    const commandToSend = "find";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: commandToSend, inGenerateRest,
        inPort
    });
};

const filterQuery = async ({ toPath, showLog, inTargetPath, inGenerateRest,
    inPort
}) => {

    const commandToSend = "filterQuery";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: commandToSend, inGenerateRest,
        inPort
    });
};

const showAll = async ({ toPath, showLog, inTargetPath, inGenerateRest,
    inPort
}) => {

    const commandToSend = "showAll";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: commandToSend, inGenerateRest,
        showLog, inPort
    });
};

const lastRecord = async ({ toPath, showLog, inTargetPath,
    inGenerateRest, inPort }) => {

    const commandToSend = "lastRecord";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: commandToSend, inGenerateRest,
        showLog, inPort
    });
};

const firstRecord = async ({ toPath, showLog, inTargetPath,
    inGenerateRest, inPort, inFolderName }) => {

    const commandToSend = "firstRecord";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: inFolderName, inGenerateRest,
        showLog, inPort
    });
};

const distinct = async ({ toPath, showLog, inTargetPath,
    inGenerateRest, inPort, inFolderName }) => {

    const commandToSend = "distinct";

    const commandFunction = await load(commandToSend);

    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: inFolderName, inGenerateRest,
        showLog, inPort
    });
};

const count = async ({ toPath, showLog, inTargetPath,
    inGenerateRest, inPort, inFolderName }) => {

    const commandToSend = "count";

    const commandFunction = await load(commandToSend);

    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: inFolderName, inGenerateRest,
        showLog, inPort
    });
};

const min = async ({ toPath, showLog, inTargetPath,
    inGenerateRest, inPort, inFolderName }) => {

    const commandToSend = "min";

    const commandFunction = await load(commandToSend);

    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: inFolderName, inGenerateRest,
        showLog, inPort
    });
};

const max = async ({ toPath, showLog, inTargetPath,
    inGenerateRest, inPort, inFolderName }) => {

    const commandToSend = "max";

    const commandFunction = await load(commandToSend);

    await commandFunction({
        toPath, cmd: commandToSend, inTargetPath,
        inFolderName: inFolderName, inGenerateRest,
        showLog, inPort
    });
};

export {
    showAll, find, filterQuery, lastRecord, firstRecord,
    distinct, count, min, max
};