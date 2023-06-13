const nodeMailer = require('../confic/Nodemailer');

exports.newMailer = (comment)=>{
    console.log('inside the node mailer');
    let htmlString = nodeMailer.renderTemlete({comment: comment}, "/Comment/new_Comments.ejs")
    
    nodeMailer.transporter.sendMail({
        from: "nodeatentication@gmail.com",
        to: comment.user.email,
        subject: "new comment publish",
        html: htmlString
    }, function(err, info){
        if(err){
            console.log("error in sending email", err);
            return;
        }

        console.log("massage send ", info);
        return;
    })
}