import getData from "./getData.js";

const startFunc = async ({ inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });
    const last = dataAsArray.at(-1);

    return await last;
};

export { startFunc };
