const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const templatesDir = path.join(__dirname, "emails");

export async function sendMail(subject, toEmail, templateName, data) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NOTIFICATION_EMAIL,
      pass: process.env.NOTIFICATION_EMAIL_PASSWORD,
    },
  });

  const templatePath = path.join(templatesDir, `${templateName}.ejs`);
  const emailHTML = await ejs.renderFile(templatePath, data);

  // return emailHTML;
  var mailOptions = {
    from: process.env.NOTIFICATION_EMAIL,
    to: toEmail,
    subject: subject,
    html: emailHTML,
  };

  return new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
