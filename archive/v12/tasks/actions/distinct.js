import path from "path";

import generateRest from "kschema-fs-api-gen-rest";
import fixEndpointsJs from "express-fix-endpoints-get-js";

import { locateSource } from "./distinct/steps/locateSource.js";
import { locateDestination } from "./distinct/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import { announce } from "./distinct/steps/announce.js";

import resolveFolderName from "./distinct/steps/resolveFolderName.js";

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true,
    inTargetPath, inGenerateRest = false, inFolderName
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
            inActionName: cmd, inFolderName, inGetType: "withParamsDynamic",
            inColumnName: "columnName"
        });


        if (fromEndPointsJs?.importResult?.found || fromEndPointsJs?.useResult?.found) {
            return await fromEndPointsJs;
        };
        // if (isAnnounce) announce({ inResolvedFolderName: fromEndPointsJs });

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