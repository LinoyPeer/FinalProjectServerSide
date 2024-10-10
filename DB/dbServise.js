const config = require("config");
const connectToAtlasDb = require("./mongodb/connectToMongodbAtlas");
const connectToLocalDb = require("./mongodb/connectToMongodbLocally");

const enviroment = config.get("ENVIRONMENT");

const connectToDb = async () => {
    if (enviroment === "development") {
        await connectToLocalDb();
    }
    if (enviroment === "production") {
        await connectToAtlasDb();
    }
};

module.exports = connectToDb;
