const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

let senderEmail = process.env.MAIL_EMAIL;
let password = process.env.MAIL_PASSWORD;
let transporter = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
        user: senderEmail,
        pass: password
    }
})
async function sendCertificationNumber(email, certificationNumber) {
    let messageOptions = {
        from: senderEmail,
        to: email,
        subject: "회원가입을 위한 인증번호 입니다.",
        text : `고객님의 인증번호는 ${certificationNumber} 입니다.`
    }
    await transporter.sendMail(messageOptions, (error, info) => {
        if(error) {
            return error
        } else {
            return info.response
        }
    })
}
// this have cors error, need to cors library to enable for a single route
router.post('/', async (req, res) => {
    return await sendCertificationNumber(req.query.email,Number(req.query.number))
        .then(result => res.send(result));
})

module.exports = router;
