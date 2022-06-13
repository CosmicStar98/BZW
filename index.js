// ========================================================================
// Server init
// ========================================================================


// Filesystem reading functions
const fs = require('fs-extra','fs');


// Load settings
try {
	stats = fs.lstatSync('./settings.json');
} catch (e) {
  	// If settings do not yet exist
	if (e.code == "ENOENT") {
		try {
			fs.copySync(
			  'settings.example.json',
				'settings.json',
			);
			console.log("Created new setting files.");
		} catch(e) {
			console.log(e);
			throw "Could not create new setting files.";
		}
	// Else, there was a misc error (permissions?)
	} else {
		console.log(e);
		throw "Could not read 'settings.json'.";
	}
}

// Load settings into memory
const settings = require('./settings.json');

// Setup basic express server

// Maintenance Configs
// Options: true and false
updating = false;

if (updating == true) {
var express = require('express');
var app = express();
if (settings.express.serveStatic)
	app.use(express.static('./build/maintenance/themes/win_7'));
var server = require('http').createServer(app);
} else {
var express = require('express');
var app = express();
if (settings.express.serveStatic)
	app.use(express.static('./build/www'));
var server = require('http').createServer(app);
};

// Init socket.io
var io = require('socket.io')(server);
var port = process.env.PORT || settings.port;
exports.io = io;

// Init sanitize-html
var sanitize = require('sanitize-html');


// Init winston loggers (hi there)
const Log = require('./log.js');
Log.init();
const log = Log.log;




// Start actually listening
server.listen(port, function () {
	console.log(
		"\n",
		"Server domain: localhost\n",
		"------------------------\n",
		"Server listening on port: " + port +
    "\n------------------------\n"
	);
});
app.use(express.static(__dirname + '/public'));
app.use(( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    next();
});


// ========================================================================
// Banning functions
// ========================================================================

// Load ban list
const Ban = require('./ban.js');
Ban.init();

// ========================================================================
// Helper functions
// ========================================================================

const Utils = require("./utils.js")

// ========================================================================
// The Beef(TM)
// ========================================================================

const Meat = require("./meat.js");
Meat.beat();

// Console commands
const Console = require('./console.js');
Console.listen(); 

// ========================================================================
// Discord Bot
// ========================================================================

//require("./bot.js")