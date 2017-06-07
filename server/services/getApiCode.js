//Use this program (node getapicode.js) to write the Google authorization code to gcals collection
var config = require('./config/config'),
 mongoose = require('mongoose'),
 gcalModel = require('./app/models/gcal');
mongoose.connect(config.db);
var Settings = mongoose.model('Gcal
var readline = require('readline');

var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;
var rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});
var oauth2Client = new OAuth2Client(config.gcal.clientID, config.gcal.clientSecret, config.gcal.callbackURL);
// generate consent page url
var url = oauth2Client.generateAuthUrl({
 access_type: 'offline',
 approval_prompt: 'force',
 scope: config.gcal.scope
});
console.log('Visit url: ', url);
rl.question('Enter the code here:', function(code) {
 //store the code in mongodb
 Settings.findOneAndUpdate({googleUserId: 'levelnxt.nodeims@gmail.com'},
 { $set: { googleUserId: 'xxxx@gmail.com', googleAuthorizationCode: code}},
 {upsert: true},
 function (err,data) {
 if (err) {
 console.log('Errorsaving settings, please try again, err= '+err);
 } else {
 console.log('Settingsed, details: '+JSON.stringify(data));
 }
 process.exit(0);
 }
 )
});