const extractColumns = ({ inColumnName, dataAsArray }) => {
    if (inColumnName.includes(".")) {
        return extractColumnsWithCondition({ inColumnName, dataAsArray });
    } else {
        return dataAsArray.map(element => element?.[inColumnName]);
    };
};

const extractColumnsWithCondition = ({ inColumnName, dataAsArray }) => {
    const [mainKey, subKey] = inColumnName.split(".");
    const requiredColumns = [];

    dataAsArray.forEach(loopMain => {
        if (loopMain && Array.isArray(loopMain[mainKey])) {
            loopMain[mainKey].forEach(loopSub => {
                if (loopSub) {
                    requiredColumns.push(loopSub[subKey]);
                }
            });
        }
    });

    return requiredColumns;
};

export default extractColumns;
