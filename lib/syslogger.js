const dgram = require('dgram');

const strftime = require('strftime');

const FACILITY = {
  kern: 0,
  user: 1,
  mail: 2,
  daemon: 3,
  auth: 4,
  syslog: 5,
  lpr: 6,
  news: 7,
  uucp: 8,
  local0: 16,
  local1: 17,
  local2: 18,
  local3: 19,
  local4: 20, // Default for browserid
  local5: 21,
  local6: 22,
  local7: 23
};

const SEVERITY = {
  emerg: 0,
  alert: 1,
  crit: 2,
  err: 3,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7
};

var counter = 1;
function name() {
  return 'SysLogger$' + (counter++);
}


function SysLogger(options) {
  this.name = options.name || name();

  if (typeof options.facility === 'string') {
    this.facility = FACILITY[options.facility];
  } else {
    this.facility = options.facility || FACILITY.user;
  }

  this.address = options.address || '127.0.0.1';
  this.port = options.port || 514;
  this.socket = dgram.createSocket('udp4');
}

SysLogger.prototype.log = function log(severity, message) {
  if (typeof severity === 'string') {
    severity = SEVERITY[severity];
  }
  else if (typeof severity !== 'number') {
    severity = SEVERITY.notice;
  }

  var msg = [
    '<' + (this.facility * 8 + severity) + '>',
    strftime('%b %d %H:%M:%S'),
    this.name,
    '[' + process.pid + ']:',
    message
  ].join (' ');

  this.socket.send(new Buffer(msg), 0, msg.length, this.port, this.address);
};

function logAtLevel(severity) {
  return function _log(message) {
    this.log(severity, message);
  };
}

for (var sev in SEVERITY) {
  if (SEVERITY.hasOwnProperty(sev)) {
    SysLogger.prototype[sev] = logAtLevel(sev);
  }
}

module.exports = SysLogger;
