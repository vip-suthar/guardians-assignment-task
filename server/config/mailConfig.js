require('dotenv').config();

module.exports = {
    PORT: process.env.MAIL_SERVICE_PORT || 465,
    SMTP_HOST: process.env.MAIL_SERVICE_SMTP_HOST || "smtp.gmail.com",
    AUTH_EMAIL: process.env.MAIL_SERVICE_AUTH_EMAIL || "",
    AUTH_PASSWORD: process.env.MAIL_SERVICE_AUTH_PASSWORD || "",
    DEFAULT_EMAIL: process.env.MAIL_SERVICE_DEFAULT_EMAIL || "Admin<vipin29suthar@gmail.com>"
}