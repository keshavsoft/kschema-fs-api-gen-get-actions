import getData from "./getData.js";
import { NotFoundError } from "./errors.js";

const startFunc = async ({ inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

    const last = dataAsArray.at(-1);

    if (!last) {
        throw new NotFoundError("No records found");
    };

    return last;
};

export { startFunc };
