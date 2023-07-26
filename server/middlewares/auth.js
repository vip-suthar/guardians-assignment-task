const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const setupDBService = require('../services/dbService');
const User = require('../models/user');

module.exports = async function (req, res, next) {
    try {
        const token = req.headers.authorization;

        // check if the token is in valid datatype, i.e. not undefined, or null.
        if (!token || typeof token == 'undefined' || token == null) {
            return res.status(403).send({
                error: "Authorization Token Invalid"
            });
        }


        let isValid = jwt.verify(token, jwtConfig.SECRET);
        if (!isValid) {
            return res.status(403).send({
                error: "Token Invalid; Please try signing in again"
            });
        }

        let data = jwt.decode(token);
        // if the token is expired.
        let tokenExpired = Math.floor(Date.now() / 1000) > data.exp;
        if (tokenExpired) {
            return res.status(403).send({
                error: "Authorization Token is Expired; Please try signing in again"
            });
        };

        await setupDBService();
        // find the user in the database.
        let user = await User.exists({ _id: data._id });

        if (!user) {
            return res.status(403).send({
                error: "User does not exist"
            });
        }

        res.locals.user_id = data._id;
        next();

    } catch (err) {
        res.status(500).json({
            error: 'Some error occured; Please try again later'
        });
    }
}