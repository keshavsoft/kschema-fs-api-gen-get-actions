import getData from "./getData.js";
import extractColumns from "./helpers/extractColumns.js";

const startFunc = async ({ inColumnName, inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

    const requiredColumnsData = extractColumns({
        inColumnName,
        dataAsArray
    });

    requiredColumnsData.sort();

    return requiredColumnsData[-1];
};

export { startFunc };
