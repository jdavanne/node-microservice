var boot = require('../app').boot,
      shutdown = require('../app').shutdown,
      port = require('../app').port,
      superagent = require('superagent'),
      expect = require('expect');

describe('server', function () {
  before(function (done) {
    boot(done);
  });
  describe('homepage', function() {
    it('should respond to GET', function(done) {
      superagent
        .get('http://localhost:' + port + '/')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          done(err)
        })
    })
  });
  after(function (done) {
    shutdown(done);
  });
});
