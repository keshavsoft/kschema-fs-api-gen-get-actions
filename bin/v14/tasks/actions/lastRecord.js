import path from "path";

import generateRest from "kschema-fs-api-gen-rest";
import fixEndpointsJs from "express-fix-endpoints-get-js";

import { locateSource } from "./LastRecord/steps/locateSource.js";
import { locateDestination } from "./LastRecord/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import { announce } from "./LastRecord/steps/announce.js";

import resolveFolderName from "./LastRecord/steps/resolveFolderName.js";

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true,
    inTargetPath, inGenerateRest = false, inFolderName, inPort
}) => {

    const localToPath = toPath;

    const resolvedFolderName = resolveFolderName({
        name: cmd
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
        const fromEndPointsJs = await fixEndpointsJs({
            endPointsJsPath: path.join(localToPath, "end-points.js"),
            inActionName: cmd, inFolderName
        });

        if (inGenerateRest) {
            generateRest({
                inTargetPath, inPort,
                toPath: path.join(localToPath, resolvedFolderName)
            });
        };
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    return resolvedFolderName;
};

export default startFunc;