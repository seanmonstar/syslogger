const assert = require('assert');
const dgram = require('dgram');

const SysLogger = require('../');


var server;
module.exports = {

  'SysLogger': {
    'beforeEach': function(done) {
      server = dgram.createSocket('udp4');
      server.bind(0, done);
    },
    'log': {
      'should output formatted message': function(done) {
        var s = new SysLogger({
          port: server.address().port
        });

        server.once('message', function(buf) {
          var str = buf.toString();
          assert(/^<\d+>/.test(str));
          assert(/<\d+> \w{3} \d{2} \d{2}:\d{2}:\d{2}/.test(str));
          assert(/SysLogger\$\d+/.test(str));
          assert(new RegExp("[" + process.pid + "]:").test(str));
          assert(/foo$/.test(str));
          done();
        });

        s.info('foo');
      }
    },
    'afterEach': function() {
      server.close();
    }
  }

};
