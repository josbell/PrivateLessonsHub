var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    gcal	 = require('google-calendar'),
    q 		 = require('q'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();



app.use(express.static(__dirname + '/../client/dist'));
app.use( express.static( path.join( root, '../node_modules' )));
app.use( express.static( path.join( root, '../bower_components' )));

app.use(bp.json());
require('./config/mongoose.js')();
require("./config/routes.js")(app);
//require("./services/gCalendar.js")(function(events){
//    console.log('From Server.js',events);
//});
app.get('*', function (req, res) {
    	res.sendFile(path.resolve('/../client/dist/index.html'));
	})

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});