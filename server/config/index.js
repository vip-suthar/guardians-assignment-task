require('dotenv').config();

const dbConfig = require('./dbConfig');
const serverConfig = require('./serverConfig');
const jwtConfig = require('./jwtConfig');
const mailConfig = require('./mailConfig');
const distMatrixConfig = require('./distMatrixConfig');

module.exports = {
    dbConfig,
    serverConfig,
    jwtConfig,
    mailConfig,
    distMatrixConfig
}