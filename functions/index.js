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

