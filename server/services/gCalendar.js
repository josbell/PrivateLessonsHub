var Promise = require('promise');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');


var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

//DB Var
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');


module.exports = function(){

  // If modifying these scopes, delete your previously saved credentials
  // at ~/.credentials/calendar-nodejs-quickstart.json

  this.getAuth = function(){
     return getCredentials
              .then(authorize)
              .catch((err)=>{
                console.log(err); 
              })
  }

  /**
   * Lists the next 100 events on the user's private lessons calendar.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  this.updateEvent = function(auth,timeslot){
    return new Promise((resolve,reject)=>{
      console.log('updateEvent: timslots ', timeslot);
      console.log('updateEvent: auth ',auth);
      var calendar = google.calendar('v3');
      calendar.events.patch({
        auth:auth,
        calendarId:'6dgskptjd0rlhqtpglmvr8pj90@group.calendar.google.com',
        eventId:timeslot.id,
        sendNotifications:true,
        resource:{
          summary:timeslot.status,
          description:timeslot.booked_by
        }
      },function(err,response){
        if(err){
          console.log('The API returned an error: ' + err);
          throw err;
        }else{
          console.log('successful',response);
          resolve(response)
        }
      })
    })
  }

  this.listEvents = function (auth) {
    return new Promise((resolve,response)=>{
      console.log('listEvents', auth);
      var calendar = google.calendar('v3');
      calendar.events.list({
      auth: auth,
      calendarId: '6dgskptjd0rlhqtpglmvr8pj90@group.calendar.google.com',
      timeMin: (new Date()).toISOString(),
      q:'Open',
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime'
      }, function(err, response) {
      if (err) {
        console.log('The API returned an error when getting Events: ' + err);
        return;
      }
      var events = response.items;
      var timeSlots = [];
      if (events.length == 0) {
        console.log('No upcoming events found.');
      } else {
        console.log('Upcoming 100 events:');
        for (var i = 0; i < events.length; i++) {
          //console.log(event);
          var event = events[i];
          var start = event.start.dateTime || event.start.date;
          var end = event.end.dateTime || event.end.date;
          var id = event.id
          var newTimeSlot = {id:id ,start:start, end:end, description:event.summary};
          timeSlots.push(newTimeSlot);
          //console.log('%s - %s', start, event.summary);
        }
        resolve(timeSlots);
      }
    });
    });
  }


  // Load client secrets from a local file.
  var getCredentials = new Promise((resolve,reject)=>{
    fs.readFile('client_secret.json',(err,credentials)=>{
      if(err) reject(err);
      else resolve(JSON.parse(credentials));
    });
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  var authorize = function(credentials) {
    return new Promise((resolve,reject)=>{
      console.log('authorize');
      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
      resolve(oauth2Client)
    })
  }

  var getToken = function(oauth2Client){
    return new Promise((resolve,reject)=>{
      console.log('getToken');
      Instructor.findOne({name:'Josbell Quiros'},(err,instructor)=>{
        if(err){
          console.log('Issue getting token', err);
          return err;
        }else{
          //Use token from DB
           oauth2Client.credentials = {
              acces_token:instructor.acces_token,
              refresh_token:instructor.refresh_token,
              token_type:instructor.token_type,
              expiry_date:instructor.expiry_date
           }
           let expiration_date = new Date(instructor.expiry_date);
           console.log(expiration_date);
           console.log('Resolved Using Mongo credentials');
           resolve(oauth2Client);
        }
      });
    });
  };


      


  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  this.getNewToken = function(code) {
    return new Promise((resolve,reject)=>{
      var clientSecret = '';
      var clientId = '';
      var redirectUrl = '';
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        oauth2Client.getToken(code, function(err, newToken) {
          if (err) {
            console.log('Error while trying to retrieve access newToken', err);
            return err;
          }
            console.log('Got new Token', newToken);
            storeToken(newToken);
            resolve(newToken);
        });
      });
//    });
  };



    

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  var storeToken = function(token) {
    console.log('Storing new Token', token);
    var query = {'name':'Josbell Quiros'};
    Instructor.update(query,token,{upsert:true, setDefaultsOnInsert:true},function(err){
      if(err){
        console.log('Issue saving user with token to DB');
      }else{
        console.log('Stored new token in MongoDB');
      }
    });
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  }

}
