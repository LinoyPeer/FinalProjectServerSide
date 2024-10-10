const mongoose = require('mongoose')

const connectToAtlasDb = async () => {
    try {
        // await mongoose.connect('');
        console.log('connected to mongodb atlas cloud');
    } catch (e) {
        console.log('couldn\'t connect to mongodb atlas', e);
    }
}

module.exports = connectToAtlasDb;