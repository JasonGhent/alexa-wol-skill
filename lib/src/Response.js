'use strict';

var Response = function(context, session) {
  this._context = context;
  this._session = session;
};

var buildSpeechletResponse = function(options) {
  var alexaResponse = {
    outputSpeech: { type: 'PlainText', text: options.output },
    shouldEndSession: options.shouldEndSession
  };
  if (options.reprompt) {
    alexaResponse.reprompt = {
      outputSpeech: { type: 'PlainText', text: options.reprompt }
    };
  }
  if (options.cardTitle && options.cardContent) {
    alexaResponse.card = {
      type: 'Simple', title: options.cardTitle, content: options.cardContent
    };
  }
  var returnResult = { version: '1.0', response: alexaResponse };
  if (options.session && options.session.attributes) {
    returnResult.sessionAttributes = options.session.attributes;
  }
  return returnResult;
};

Response.prototype = (function() {
  return {
    tell: function(speechOutput) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,

        shouldEndSession: true
      }));
    },
    tellWithCard: function(speechOutput, cardTitle, cardContent) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,

        cardTitle: cardTitle,
        cardContent: cardContent,

        shouldEndSession: true
      }));
    },
    ask: function(speechOutput, repromptSpeech) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,

        reprompt: repromptSpeech,

        shouldEndSession: false
      }));
    },
    askWithCard: function(speechOutput, reprompt, cardTitle, cardContent) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,

        reprompt: reprompt,
        cardTitle: cardTitle,
        cardContent: cardContent,

        shouldEndSession: false
      }));
    }
  };
})();

module.exports = Response;
