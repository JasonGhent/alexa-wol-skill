var _           = require('lodash');
var invocation  = require('../lib/src');
var mock        = require('./data');
var AlexaSkill;
var alexaSkill;

describe('Alexa Skill', function () {

  it('should work as intended', function (done) {
    this.timeout(5000);
    invocation.handler(mock.fake_event, mock.fake_context);
    setTimeout(done, 4000);
  });

  describe('Internal logic', function () {
    it('can be loaded', function () {
      AlexaSkill = require('../lib/src/AlexaSkill');
    });
    it('can be instantiated', function () {
      alexaSkill = new AlexaSkill();
    });
    it('can execute', function () {
      alexaSkill.execute(mock.fake_event, mock.fake_context);
    });
  });
});
