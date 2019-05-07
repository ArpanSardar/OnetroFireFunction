const functions = require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors=require('cors')({origin:true});
const busboy=require('busboy');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const SENDGRID_API_KEY= functions.config().sendgrid.key;
const Mail=require('@sendgrid/mail');
Mail.setApiKey(SENDGRID_API_KEY);

exports.onCandidateRegistered=functions.firestore.document('ActivityMonitor/{CandidateId}').onCreate((snap,context)=>{
    const data=snap.data();
    // const newData={
    //     msg:data.msg.toUpperCase()
    // };
    // // return event.data.ref.parent.child('copiedData').set(newData);
    // return event.data.ref.child('copiedData').set(newData);
    console.log(data.email);
    console.log(data.name);

    const msg={
        to: data.email,
        cc: 'ankur.sardar16@gmail.com',
        // bcc: ['ankur.sardar16@gmail.com','arpansardar1988@gmail.com'],
        from: 'support@onetro.jp',
        // subject: 'Registration successful',
        templateId:'d-56fc17d0d2584cc2b3d7f4b64aff83af',
        dynamic_template_data: {
            subject: 'Registration successful with Onetro',
            name: data.name,
          },
    }

    return Mail.send(msg)
    // return Mail.sendMultiple(msg)
    .then(()=>{
        console.log('email sent');
    
    }).catch(err=>console.log(err));
   
})
