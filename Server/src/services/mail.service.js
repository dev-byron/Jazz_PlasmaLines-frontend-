var nodemailer = require('nodemailer');
const config = require('../config.json');

var transporter = nodemailer.createTransport({
    service: config.notifications.service,
    auth: {
        user: config.notifications.email,
        pass: config.notifications.pwd,
    }
});

module.exports = {
    async sendMail(emailTo, pwd) {
        var mailOptions = {
            from: config.notifications.email,
            to: emailTo,
            subject: 'Welcome to Jazz Lines Manager',
            text: 'Your username is: ' + emailTo + 'and your temporal password is ' + pwd + '.'
        };
        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return;
            } else {
                return info.response;
            }
        });
    }
}
