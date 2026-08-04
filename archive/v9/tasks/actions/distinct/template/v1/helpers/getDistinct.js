const getDistinct = ({ inDataArray }) => {
    return [...new Set(inDataArray)];
};

export default getDistinct;
