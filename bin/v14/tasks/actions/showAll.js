import path from "path";

import generateRest from "kschema-fs-api-gen-rest";
import fixAnyJs from "express-fix-any-js";

import { locateSource } from "./ShowAll/steps/locateSource.js";
import { locateDestination } from "./ShowAll/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import { announce } from "./ShowAll/steps/announce.js";

import resolveFolderName from "./ShowAll/steps/resolveFolderName.js";
import actions from "./ShowAll/actions.json" with { type: "json" };

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true,
    inTargetPath, inGenerateRest = false, inFolderName
}) => {

    const matched = actions;

    // const localToPath = toPath;

    const localToPath = toPath ? toPath : process.cwd();

    const resolvedFolderName = resolveFolderName({
        name: inFolderName || cmd || "ShowAll",
        inDefaultFolderName: "ShowAll"
    });

    if (resolvedFolderName.KTF === false) {
        console.log(resolvedFolderName.KReason);

        return;
    };

    const source = locateSource();
    const destination = locateDestination({
        inResolvedFolderName: resolvedFolderName,
        toPath: localToPath
    });

    const createFolderResponse = createFolder({
        source, destination,
        isAnnounce, checkBeforeCreate
    });

    if (createFolderResponse.KTF) {
        const fromEndPointsJs = fixAnyJs({
            inFileType: cmd,
            inTargetPath: localToPath,
            inValue: inFolderName, OutValue: inFolderName
        });

        if (fromEndPointsJs?.importResult?.found || fromEndPointsJs?.useResult?.found) {
            return await fromEndPointsJs;
        };

        if (inGenerateRest) {
            generateRest({
                inTargetPath,
                toPath: path.join(localToPath, resolvedFolderName)
            });
        };
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    return resolvedFolderName;
};

export default startFunc;