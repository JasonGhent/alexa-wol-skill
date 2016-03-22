'use strict';

var cfg        = require('../cfg');
var AlexaSkill = require('./AlexaSkill');
var http       = require('http');
var output     = 'IT IS DONE.';
var options    = { host: cfg.TARGET_IP, port: 3488 };

var SteamMachine = function() {
  // TODO get env var from `source .env` into skill
  AlexaSkill.call(this, cfg.ALEXA_WOL_SKILL_APP_ID || '');
};

// Extend AlexaSkill
SteamMachine.prototype = Object.create(AlexaSkill.prototype);
SteamMachine.prototype.constructor = SteamMachine;

// Event Handlers
SteamMachine.prototype.eventHandlers.onSessionStarted = function(req, session) {
  log(req, 'onSessionStarted', session);
  // initialization logic goes here
};
SteamMachine.prototype.eventHandlers.onLaunch = function(req, session, res) {
  log(req, 'onLaunch', session);
  handleNewFactRequest(res);
};
SteamMachine.prototype.eventHandlers.onSessionEnded = function(req, session) {
  log(req, 'onSessionEnded', session);
  // cleanup logic goes here
};

// Intent Handlers
SteamMachine.prototype.intentHandlers.GetNewFactIntent = GetNewFactIntent;
SteamMachine.prototype.intentHandlers.HelpIntent = HelpIntent;

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
  var steamMachine = new SteamMachine();
  steamMachine.execute(event, context); // necessary for skill processing
};

function handleNewFactRequest(response) {
  console.log('sending WOL request');
  http.get(options, function(res) {
    response.tellWithCard(output, 'SteamMachine', output);
  }).on('error', console.log);
}
function GetNewFactIntent(intent, session, response) {
  handleNewFactRequest(response);
}
function HelpIntent(intent, session, response) {
  response.ask('help');
}
function log(req, type, session) {
  return 'SteamMachine ' + type +
    ' requestId: ' + req.requestId + ', sessionId: ' + session.sessionId;
}
