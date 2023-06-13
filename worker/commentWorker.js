let queue = require('../confic/kue');

const commentMailer = require('../Mailer/comment-mail');

queue.process('email',function(job, done){
     console.log('emails worker prossesing for an job', job.data);
     
     commentMailer.newMailer(job.data);

     done();
     
})