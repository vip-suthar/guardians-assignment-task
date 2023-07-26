require('dotenv').config();

module.exports = {
    SECRET: process.env.JWT_SECRET || "MyJWTSecret",
    DEFAULT_TOKEN_LIFE: 24 * 60 * 60 // 24 Hours
}