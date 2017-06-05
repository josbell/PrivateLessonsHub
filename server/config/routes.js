
module.exports = function(app){
	const path = require("path");
	// For Angular Routing
	app.get('*', function (req, res) {
    	res.sendFile(path.resolve('../client/dist/index.html'));
	})
	
}