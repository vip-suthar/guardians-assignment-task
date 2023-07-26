const mongoose = require('mongoose');

const { dbConfig } = require('../config');

let dbInstance = null;
const setupDBService = async () => {
    try {

        if(dbInstance) return dbInstance;
        // Connect to MongoDB
        const db = await mongoose.connect(dbConfig.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connected!");

        return dbInstance = db;
    } catch (error) {
        console.log(`Some error occured while connecting database: ${error.message}`);
        return null;
    }
};

module.exports = setupDBService;