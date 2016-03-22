'use strict';

var Response = require('./Response');

/* The AlexaSkill prototype and helper functions */
function AlexaSkill(appId) { this._appId = appId; }

AlexaSkill.prototype.requestHandlers = {
  LaunchRequest: function(event, context, response) {
    this.eventHandlers.onLaunch(event.request, event.session, response);
  },
  IntentRequest: function(event, context, response) {
    this.eventHandlers.onIntent(event.request, event.session, response);
  },
  SessionEndedRequest: function(event, context) {
    this.eventHandlers.onSessionEnded(event.request, event.session);
    context.succeed();
  }
};

/* Override any of the eventHandlers as needed */
AlexaSkill.prototype.eventHandlers = {
  /* Called when the session starts. */
  onSessionStarted: function(sessionStartedRequest, session) { },

  /* Called when the user launches the skill w/o specifying what they want. */
  onLaunch: function(launchRequest, session, response) {
    throw 'onLaunch should be overriden by subclass';
  },

  /* Called when the user specifies an intent. */
  onIntent: function(intentRequest, session, response) {
    var intent = intentRequest.intent,
      intentName = intentRequest.intent.name,
      intentHandler = this.intentHandlers[intentName];
    if (intentHandler) {
      console.log('dispatch intent = ' + intentName);
      intentHandler.call(this, intent, session, response);
    } else {
      throw 'Unsupported intent = ' + intentName;
    }
  },

  /* Called when the user ends the session. */
  onSessionEnded: function(sessionEndedRequest, session) { }
};

/* Subclasses should override the intentHandlers with the handler functions */
AlexaSkill.prototype.intentHandlers = {};
AlexaSkill.prototype.execute = function(event, context) {
  try {
    var session = event.session;
    var appId = session.application.applicationId;
    console.log('session applicationId: ' + appId);

    // Validate that this request originated from authorized source.
    if (this._appId && this._appId !== appId) {
      console.log('appIds don\'t match: ' + appId + ' and ' + this._appId);
      throw 'Invalid applicationId';
    }

    session.attributes = session.attribute || {};

    if (session.new) {
      this.eventHandlers.onSessionStarted(event.request, session);
    }

    // Route the request to the proper handler which may have been overriden.
    var requestHandler = this.requestHandlers[event.request.type];
    requestHandler.call(this, event, context, new Response(context, session));
  } catch (e) {
    console.log('Unexpected exception ' + e);
    context.fail(e);
  }
};

module.exports = AlexaSkill;
