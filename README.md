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
  port: 514
});

logger.log(severity, message);
// or
logger.notice(message);
logger.warn(message);
logger.emerg(message);
```
