import getData from "./getData.js";

const startFunc = async ({ inRequestQuery, inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

    const filteredRows = dataAsArray.filter(item => {
        return Object.entries(inRequestQuery).every(
            ([key, value]) => item[key] === value
        )
    });

    return await filteredRows;
};

export default startFunc;