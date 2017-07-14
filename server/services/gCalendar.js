var Promise = require('promise');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

//DB Var
var mongoose = require('mongoose');
var Credentials = mongoose.model('ApiCredentials');

module.exports = function(){

  this.bookEvent = function(auth,booking,calendarId,booked_by){
    return new Promise((resolve,reject)=>{
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
          console.log('Booking successful');
          resolve(response)
        }
      })
    })
  }

  this.cancelEvent = function(auth,booking,calendarId){
    return new Promise((resolve,reject)=>{
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
          console.log('Cancel Event successful');
          resolve(response)
        }
      })
    })
  }

  this.listEvents = function (auth,calendarId) {
    return new Promise((resolve,response)=>{
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
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var start = event.start.dateTime || event.start.date;
          var end = event.end.dateTime || event.end.date;
          var id = event.id
          var newTimeSlot = {id:id ,start:start, end:end, description:event.summary};
          timeSlots.push(newTimeSlot);
        } 
      }
      resolve(timeSlots);
    });
    });
  }

  this.getToken = function(instructor){
    var oauth2Client = this.getOAuthClient();
    return new Promise((resolve,reject)=>{
      this.getOAuthClient().
        then(oauth2Client=>{
          oauth2Client.credentials = {
            access_token:instructor.access_token,
            refresh_token:instructor.refresh_token,
            token_type:instructor.token_type,
            expiry_date:instructor.expiry_date
          }
          let expiration_date = new Date(instructor.expiry_date);
          console.log('Got Token Using Mongo credentials');
          resolve(oauth2Client);
        })
    })
  };

  this.getNewToken = function(code) {
    return new Promise((resolve,reject)=>{
      this.getOAuthClient()
        .then(oauth2Client=>{
          oauth2Client.getToken(code, function(err, newTokens) {
            if (err) {
              console.log('Error while trying to retrieve access newToken', err);
              return err;
            }
            console.log('Got new Token');
            resolve(newTokens);
          });
        });
    })   
  };

  this.getAuthUrl = function(userData) {
   	//console.log('Services : getAuthUrl : userData : ',userData);
    	return new Promise((resolve,reject)=>{
	 this.getOAuthClient()
                .then(oauth2Client=>{
		 // console.log('Services Hello : getAuthUrl : oauth2Client : ', oauth2Client);
                 // console.log('Services : generateAuthUrl : oauth2Client,userData : ',oauth2oauth2Client,userData);
     		  var scopes = ['https://www.googleapis.com/auth/calendar'];
     		  var state = userData
     		  var url = oauth2Client.generateAuthUrl({
         		 access_type: 'offline',
         		 scope: scopes,
         		 state: encodeURIComponent(JSON.stringify(state))
     		 });
	     	 console.log('Services : generateAuthUrl : url : ', url);
	     	 resolve(url);
                });
	})    
  }

  this.generateAuthUrl = function(oauth2Client,userData){
    return new Promise((resolve,reject)=>{
      console.log('Services : generateAuthUrl : oauth2Client,userData : ',oauth2oauth2Client,userData);
      var scopes = ['https://www.googleapis.com/auth/calendar'];
      var state = userData 
      var url = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes,
          state: encodeURIComponent(JSON.stringify(state)) 
      });
      console.log('Services : generateAuthUrl : url : ', url);
      resolve(url);
    })
  };

  this.getOAuthClient = function () {
    return new Promise((resolve,reject)=>{
      let newCredentials = new Credentials({
        "apiName" : "google",
        "clientSecret" : "NpkfXHPUhKbcI-u1NPoCmsWA",
        "clientId" : "858301130072-q7kvdksh72udbd8kg23kkhijg4sju3dc.apps.googleusercontent.com",
        "redirectionUrl" : "http://www.privatelessonshub.com/oauthCallback/",
      });
/*
      newCredentials.save(err=>{
        if(err){
          console.log('Issue saving credentials', err);
        }
      });

*/	
 	Credentials.findOne({'apiName':'google'},(err,credentials)=>{
        if(err){
          console.log('Issue getting api config data from MongoDB',err);
          return err;
        }else{
        //  console.log('Got credentials from DB',credentials);
          ClientSecret =  credentials.clientSecret;
          ClientId = credentials.clientId,
          RedirectionUrl = credentials.redirectionUrl;
        //  console.log('Services : getOAuthClient : credentials : ',credentials);
        //  console.log('Services : getOAuthClient : ClienClientSercret, Clientid, RedirectionUrl : ',ClientSecret, ClientId, RedirectionUrl);
          let oauth2Client = new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
	  console.log('Services : getOAuthClient : oauth2Client : ',oauth2Client);
          resolve(oauth2Client);
        }  
      })
    })
  }

}
