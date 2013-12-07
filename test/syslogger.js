const assert = require('assert');
const dgram = require('dgram');

const SysLogger = require('../');


var server;
module.exports = {

  'SysLogger': {
    'beforeEach': function(done) {
      server = dgram.createSocket('udp4');
      server.once('listening', done);
      server.bind(0);
    },
    'log': {
      'should output formatted message': function(done) {
        var s = new SysLogger({
          port: server.address().port
        });

        server.once('message', function(buf) {
          var str = buf.toString();

          assert(/^<\d+>/.test(str), str);
          assert(/<\d+> \w{3} \d{2} \d{2}:\d{2}:\d{2}/.test(str), str);
          assert(/SysLogger\$\d+/.test(str), str);
          assert(new RegExp("[" + process.pid + "]:").test(str), str);
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
