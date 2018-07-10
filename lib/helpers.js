var helpers = {};



helpers.parseJsonToObject = (buffer) => {
    try {
        var obj = JSON.parse(buffer);
        return obj;
    } catch (error) {
        return {};
    }
};



module.exports = helpers;
