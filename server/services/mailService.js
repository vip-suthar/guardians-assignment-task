const nodemailer = require('nodemailer');
const { mailConfig } = require('../config');

let tpInstance = null;
const setupMailService = async () => {
    try {

        if (tpInstance) return tpInstance;

        /* Creating a transporter object that will be used to send emails. */
        const transporter = nodemailer.createTransport({
            port: mailConfig.PORT,
            host: "smtp.gmail.com",
            auth: {
                user: mailConfig.AUTH_EMAIL,
                pass: mailConfig.AUTH_PASSWORD,
            },
            secure: true,
        });

        await transporter.verify();

        console.log("Email Service Connected Successfully");

        return tpInstance = transporter;

    } catch (err) {
        console.log(`Some error occured while connecting mail service: ${err.message}`)
    }
}
module.exports = setupMailService;