'use strict';

var cfg  = require('../lib/cfg');
var noOp = function () { /* no-op */ };

// event obj
module.exports.fake_event = {
  session: {
    application: {
      applicationId: cfg.ALEXA_WOL_SKILL_APP_ID
    }
  },
  request: {
    type: 'LaunchRequest'
  }
};

//context obj
module.exports.fake_context = { succeed: noOp, fail: noOp };
