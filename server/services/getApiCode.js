const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const googleAutoOauth2 = require('google-auto-oauth2')
 
const CLIENT_ID = 'xxxxxx.apps.googleusercontent.com'
const CLIENT_SECRET = 'xxxxxx'
const REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob'
 
var params = {
    email: 'josbell.quiros@gmail.com',
    password: '123qweQWE'
}
 
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
 
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token) 
  scope: SCOPES // If you only need one scope you can pass it as string 
})
 
googleAutoOauth2.options = { //nightmare options 
    show: true,
    webPreferences:{
        partition: 'nopersist',
    }
}
 
googleAutoOauth2.getCode(url, params, 20000).then(data => {
    oauth2Client.getToken(data.code, function(err, tokens) {
      if(!err) {
        console.log(tokens);
      }
    })
}).catch((error) => console.log(error))