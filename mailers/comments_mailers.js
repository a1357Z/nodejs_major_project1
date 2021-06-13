const nodemailer = require('../config/nodemailer')

//another way of exporting a method
exports.newComment =async (comment) => {
  const html = await nodemailer.renderTemplate({name: comment.user.name, comment: comment.comment},'/comment_template.ejs')
  console.log('inside new comment mailer');
  console.log('the email is ',process.env.GMAIL_ID);
  nodemailer.transporter.sendMail({
    from: process.env.GMAIL_ID,
    to: comment.user.email,
    subject: 'new comment published',
    html: html
  },(err, info) => {
    if(err){
      return console.log("error in sending mail",err);
    }
    return console.log('mail sent with info :',info);
  })
}

//'<h1>Your comment is now published</h1>'