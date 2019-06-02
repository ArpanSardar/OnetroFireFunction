const functions = require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors=require('cors')({origin:true});
const busboy=require('busboy');
const nodemailer=require('nodemailer');
const xoauth2= require('xoauth2');
const SENDGRID_API_KEY= functions.config().sendgrid.key;
const Mail=require('@sendgrid/mail');
Mail.setApiKey(SENDGRID_API_KEY);

const hbs= require('nodemailer-express-handlebars');

exports.onCandidateRegistered=functions.firestore.document('CandidateInfo/{CandidateId}').onCreate((snap,context)=>{
    const data=snap.data();
    
  
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            // user: 'ankur.sardar16@gmail.com',
            // clientId: '1008266135608-il5jgnhue7vhpjb3pjql4hgfu2stfr24.apps.googleusercontent.com',
            // clientSecret:'Sx7zpORMlJRNfqZYo6iqueZ2',
            // refreshToken:'1/Mi479BEZ2I7YNKiWAaVcDTnkVwgMaBchoP0WhbdVYB8',
            user: 'onetro_support@willings.co.jp',
            clientId: '1099430575149-b3kjo3dn3lfohgbq8ir0vgkeqa49d53n.apps.googleusercontent.com',
            clientSecret:'KRfEoqGH353Ai8jc5tNu9I-D',
            refreshToken:'1/uUURtqh4Kdc6tLW2oo2GCqTNrB38s4GfP75xryEJiyYEX9iTaGPJwryL6_lVXC8R'
        }
    });

    let mailOptions={
        from:'onetro_support@willings.co.jp',
        to: data.email,
        bcc: 'contact@willings.co.jp',
        subject:'Registration Successful with Onetro',
        generateTextFromHTML: true,
        html: `
                <p><b><big>Hello ${data.name}</big></b></p>
            <p><big>Welcome to Onetro.</big></p>
            <p>
                You have successfully registered on Onetro with email <b>${data.email}.</b><br />
                If there are any changes required or any other queries, please reply to this mail or contact us at <b>contact@willings.co.jp</b>.
            </p>
            <p>
                Now that you have registered, please update all the information in your profile and complete that to let the hiring begin.<br />
                We look forward to serve you.
            </p>

            <p>
                Best regards,<br />
                Team Onetro
            </p>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
});

exports.onCandidateRegisteredMail=functions.firestore.document('TEST/{CandidateId}').onCreate((snap,context)=>{
  const data=snap.data();
  

  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          type: 'OAuth2',
          // user: 'ankur.sardar16@gmail.com',
          // clientId: '1008266135608-il5jgnhue7vhpjb3pjql4hgfu2stfr24.apps.googleusercontent.com',
          // clientSecret:'Sx7zpORMlJRNfqZYo6iqueZ2',
          // refreshToken:'1/Mi479BEZ2I7YNKiWAaVcDTnkVwgMaBchoP0WhbdVYB8',
          user: 'onetro_support@willings.co.jp',
          clientId: '1099430575149-b3kjo3dn3lfohgbq8ir0vgkeqa49d53n.apps.googleusercontent.com',
          clientSecret:'KRfEoqGH353Ai8jc5tNu9I-D',
          refreshToken:'1/uUURtqh4Kdc6tLW2oo2GCqTNrB38s4GfP75xryEJiyYEX9iTaGPJwryL6_lVXC8R'
      }
  });

  transporter.use('compile',hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
  }))

  let mailOptions={
      from:'onetro_support@willings.co.jp',
      to: 'arpansardar1988@gmail.com',
      // bcc: 'contact@willings.co.jp',
      subject:'TEST Registration Successful with Onetro',
      generateTextFromHTML: true,
      template: 'index',
      context: {
        name: 'Arpan'
    }
  };

  return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
});

exports.onCompanyRegistered=functions.firestore.document('CompanyInfo/{CompanyId}').onCreate((snap,context)=>{
    const data=snap.data();
    
  
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'onetro_support@willings.co.jp',
            clientId: '1099430575149-b3kjo3dn3lfohgbq8ir0vgkeqa49d53n.apps.googleusercontent.com',
            clientSecret:'KRfEoqGH353Ai8jc5tNu9I-D',
            refreshToken:'1/uUURtqh4Kdc6tLW2oo2GCqTNrB38s4GfP75xryEJiyYEX9iTaGPJwryL6_lVXC8R'
        }
    });

    let mailOptions={
        from:'onetro_support@willings.co.jp',
        to: data.email,
        subject:'Registration Successful with Onetro',
        generateTextFromHTML: true,
        html: `
            <p><b><big>Welcome to Onetro.</big></b></p>
            <p>
                You have successfully registered on Onetro with email <b>${data.email}.</b><br />
                If there are any changes required or any other queries, please reply to this mail or contact us at <b>contact@willings.co.jp</b>.
            </p>
            <p>
                Now that you have registered, please update all the information in your profile and explore all the candidates to let the hiring begin.<br />
                We look forward to serve you.
            </p>

            <p>
                Best regards,<br />
                Team Onetro
            </p>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
});

exports.onIntroductionVideoUpdate=functions.firestore.document('CandidateInfo/{CandidateId}').onUpdate((change,context)=>{
  const oldData=change.before.data();
  const newData=change.after.data();

if(oldData.video != newData.video)
{
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          type: 'OAuth2',
          // user: 'ankur.sardar16@gmail.com',
          // clientId: '1008266135608-il5jgnhue7vhpjb3pjql4hgfu2stfr24.apps.googleusercontent.com',
          // clientSecret:'Sx7zpORMlJRNfqZYo6iqueZ2',
          // refreshToken:'1/Mi479BEZ2I7YNKiWAaVcDTnkVwgMaBchoP0WhbdVYB8',
          user: 'onetro_support@willings.co.jp',
          clientId: '1099430575149-b3kjo3dn3lfohgbq8ir0vgkeqa49d53n.apps.googleusercontent.com',
          clientSecret:'KRfEoqGH353Ai8jc5tNu9I-D',
          refreshToken:'1/uUURtqh4Kdc6tLW2oo2GCqTNrB38s4GfP75xryEJiyYEX9iTaGPJwryL6_lVXC8R'
      }
  });

  let mailOptions={
      from:'onetro_support@willings.co.jp',
      to: 'ankur.sardar16@gmail.com',
      subject:'Introduction video updated',
      generateTextFromHTML: true,
      html: `
              <p><b><big>Hello Team</big></b></p>
          <p><big>Introduction Video has been updated by Candidate Id: <b>${newData.id}</b></big></p>
          <p>
              Please review the profile. Below is the Candidate Details:<br />
          </p>
          <p>
              Candidate Id: <b>${newData.id}</b><br />
              Name: <b>${newData.name}</b><br />
              E-Mail: <b>${newData.email}</b><br />
              Video file name: <b>${newData.id}</b><br />
              Video file location: <b>OnetroCompany > Storage > IntroVideo > </b><br />

          </p>
          <p>
          <br /><br />This is a system generated Mail.
          </p>`
  };

  return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
});

exports.sendEmail=functions.https.onRequest((req,res)=>{
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'onetro_support@willings.co.jp',
        clientId: '1099430575149-b3kjo3dn3lfohgbq8ir0vgkeqa49d53n.apps.googleusercontent.com',
        clientSecret:'KRfEoqGH353Ai8jc5tNu9I-D',
        refreshToken:'1/uUURtqh4Kdc6tLW2oo2GCqTNrB38s4GfP75xryEJiyYEX9iTaGPJwryL6_lVXC8R'
    }
});

let mailOptions={
    from:'onetro_support@willings.co.jp',
    to: req.query.email,
    subject:'Reminder to complete Onetro profile',
    generateTextFromHTML: true,
    html: `
            <p><b><big>Hello ${req.query.name}</big></b></p>
        <p><big>Greetings from Onetro.</big></p>
        <p>
          We noticed you have not completed your profile yet. 
          If your profile is not complete, companies will not be able to see your profile. 
          Please complete your profile to let the hiring begin. You will also be credited 3 stars 
          that can be exchanged for money later.
        </p>
        <p>
          If there are any changes or any other queries, please contact us at 
          <b>onetro_support@willings.co.jp</b> or reply to this mail.
        </p>

        <p>
            Best regards,<br />
            Team Onetro
        </p>`
};

return new Promise((resolve, reject) => {
  transporter.sendMail(mailOptions, error => {
    if (error) {
      reject(error);
      res.send("Error in sending email.");
    } else {
      resolve();
      res.send("Email sent successfully.");

    }
  });
});

});

