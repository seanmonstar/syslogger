# SysLogger

[![Build Status](https://travis-ci.org/seanmonstar/syslogger.png?branch=master)](https://travis-ci.org/seanmonstar/syslogger)
[![NPM version](https://badge.fury.io/js/syslogger.png)](http://badge.fury.io/js/syslogger)

A sane, simple API to blast things at syslog.

```js
var SysLogger = require('syslogger');
var logger = new SysLogger({
  name: 'myApp',
  facility: 'user',
  address: '127.0.0.1',
  port: 514,
  type: 'BSD' // 'BSD', 'RFC3164' or 'RFC5424'
});

logger.log(severity, message);
// or
logger.notice(message);
logger.warn(message);
logger.emerg(message);
```

To choose between different formats, pass a value as the `type` option.
See https://github.com/squeeks/glossy#producing about the formats.

Note: you need to ensure syslog is listening on UDP port 514 for this example to work. On Ubuntu, for example, you would need to edit /etc/rsyslog.conf, add/uncomment the following lines, and ensure rsyslog is restarted:

```
# provides UDP syslog reception
$ModLoad imudp
$UDPServerAddress 127.0.0.1
$UDPServerRun 514
```
