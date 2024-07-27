const nodemailer = require("nodemailer");

module.exports = {
  async index(ctx, next) {
    try {
      const { from, name, to, subject, message } = ctx.request.body;
      if (!from || !name || !to || !subject || !message) {
        return ctx.badRequest("Something is missing in request!");
      }
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const bodyFormat = `Mail from ${from}.\n`;

      let mailOptions = {
        from: `"${name}" <${from}>`,
        to: to,
        subject: subject,
        text: bodyFormat + message,
      };

      await transporter.sendMail(mailOptions);
      ctx.body = "Email send";
    } catch (error) {
      console.log("Error in email send API : ", error);
      return ctx.badRequest("Email can not send!");
    }
  },
};
