const mongoose = require('mongoose')
require('dotenv').config();


const atlasStringConnection = process.env.ATLAS_CONNECTION_STRING;

const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(atlasStringConnection);
        console.log('connected to mongodb atlas cloud');
    } catch (e) {
        console.log('couldn\'t connect to mongodb atlas', e);
        throw new Error('couldn\'t connect to mongodb atlas', e);
    }
}

module.exports = connectToAtlasDb;