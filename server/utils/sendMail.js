const setupMailService = require('../services/mailService');
const { mailConfig } = require('../config');

/**
 * It sends an email to the specified email address
 * @param {String} to - The email address of the receiver
 * @param {object} data - data contains the email data to be sent
 * @param {Function} callback - a function that will be called when the email is sent.
 * @param {object} from - The email address of the sender.
 */
function sendMail(to, data = {}, callback = () => { }, from = mailConfig.DEFAULT_EMAIL) {

    if (!to) return;

    setupMailService()
        .then(tp => {
            const mailData = {
                from: from,  // sender address
                to: to,   // list of receivers
                subject: data.subject,
                text: data.text,
                html: data.html,
            };

            tp.sendMail(mailData, callback);
        })
        .catch(err => {
            console.log("Error sending email");
        });
}

module.exports = sendMail;