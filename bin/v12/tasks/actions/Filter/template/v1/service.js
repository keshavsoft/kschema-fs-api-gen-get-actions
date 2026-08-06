import getData from "./getData.js";

const startFunc = async ({ inPk, inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

    const filterRows = dataAsArray.filter(element => {
        return element.pk === inPk;
    });

    return await filterRows;
};

export { startFunc };
