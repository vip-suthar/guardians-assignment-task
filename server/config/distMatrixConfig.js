require('dotenv').config();

module.exports = {
    API_KEY: process.env.DIST_MATRIX_API_KEY,
    BASE_URI: "https://api.distancematrix.ai/maps/api/distancematrix/json"
}