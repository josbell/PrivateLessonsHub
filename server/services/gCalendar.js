var Promise = require('promise');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var OAuth2 = google.auth.OAuth2;
var Session = require('express-session');
var plus = google.plus('v1');
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
  this.bookEvent = function(auth,booking,calendarId,booked_by){
    return new Promise((resolve,reject)=>{
      console.log('updateEvent: booking ', booking);
      console.log('updateEvent: auth ',auth);
      var calendar = google.calendar('v3');
      calendar.events.patch({
        auth:auth,
        calendarId:calendarId,
        eventId:booking.gCalEventId,
        sendNotifications:true,
        resource:{
          summary:'Booked by ' + booked_by.name,
          description:booked_by.email
        }
      },function(err,response){
        if(err){
          console.log('The API returned an error when updating event: ' + err);
          throw err;
        }else{
          console.log('successful',response);
          resolve(response)
        }
      })
    })
  }

  this.cancelEvent = function(auth,booking,calendarId){
    return new Promise((resolve,reject)=>{
      console.log('updateEvent: booking ', booking);
      console.log('updateEvent: auth ',auth);
      var calendar = google.calendar('v3');
      calendar.events.patch({
        auth:auth,
        calendarId:calendarId,
        eventId:booking.gCalEventId,
        sendNotifications:true,
        resource:{
          summary:'Open',
          description:''
        }
      },function(err,response){
        if(err){
          console.log('The API returned an error when updating event: ' + err);
          throw err;
        }else{
          console.log('successful',response);
          resolve(response)
        }
      })
    })
  }

  this.listEvents = function (auth,calendarId) {
    return new Promise((resolve,response)=>{
      console.log('listEvents', auth);
      var calendar = google.calendar('v3');
      calendar.events.list({
      auth: auth,
      calendarId:calendarId,
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
      }
      resolve(timeSlots);
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

  this.getToken = function(instructor){
    var oauth2Client = this.getOAuthClient();
    return new Promise((resolve,reject)=>{
      console.log('getToken');
      oauth2Client.credentials = {
        access_token:instructor.access_token,
        refresh_token:instructor.refresh_token,
        token_type:instructor.token_type,
        expiry_date:instructor.expiry_date
      }
      let expiration_date = new Date(instructor.expiry_date);
      console.log(expiration_date);
      console.log('Resolved Using Mongo credentials');
      resolve(oauth2Client);
    })
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
      var oauth2Client = this.getOAuthClient();
        console.log('oauth2Client , code:',oauth2Client,code);
        oauth2Client.getToken(code, function(err, newTokens) {
          if (err) {
            console.log('Error while trying to retrieve access newToken', err);
            return err;
          }
            console.log('Got new Token', newTokens);
            resolve(newTokens);
        });
      });
  };

  this.fetchUserData = function(tokens){
    var oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(tokens);

  }

  this.getAuthUrl = function(userData) {
    var oauth2Client = this.getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = ['https://www.googleapis.com/auth/calendar'];
    var state = userData 
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes, // If you only need one scope you can pass it as string
        state: encodeURIComponent(JSON.stringify(state)) 
    });
 
    return url;
}

  this.getOAuthClient = function () {
    const ClientSecret = 'NpkfXHPUhKbcI-u1NPoCmsWA';
    const ClientId = '858301130072-q7kvdksh72udbd8kg23kkhijg4sju3dc.apps.googleusercontent.com';
    const RedirectionUrl = 'http://localhost:8000/oauthCallback/';
    return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}
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
  }

}
