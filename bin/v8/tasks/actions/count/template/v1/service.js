import getData from "./getData.js";

const startFunc = async ({ inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

    return dataAsArray.length;
};

export { startFunc };
