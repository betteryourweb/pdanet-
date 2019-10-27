"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRun = pRun;
exports.run = run;
exports.checkProcess = checkProcess;
exports.localFwd = localFwd;
exports.getOpenPorts = getOpenPorts;
exports.isPortOpen = isPortOpen;
exports.getRandPort = getRandPort;

var _child_process = require("child_process");

var _console = require("console");

var _crypto = require("crypto");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function pRun(cmd) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!cmd || typeof cmd === 'undefined') throw new Error("No command given...");
  return new Promise(function (resolve, reject) {
    var args = cmd.split(' ');
    cmd = args.shift();
    var prog = (0, _child_process.spawn)(cmd, args, opts);
    var _data = "";
    var _err = "";
    prog.stdout.on('data', function (data) {
      return _data += data.toString();
    });
    prog.stderr.on('data', function (data) {
      return _err += data.toString();
    });
    prog.stderr.on('error', function (data) {
      return _err += data.toString();
    });
    prog.on('close', function () {
      return _err.length ? reject(_err) : resolve(_data);
    });
  });
}

function run(cmd) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!cmd || typeof cmd === 'undefined') throw new Error("No command given...");
  var args = cmd.split(' ');
  cmd = args.shift();
  var prog = (0, _child_process.spawn)(cmd, args, opts);
  var _data = "";
  var _err = "";
  prog.stdout.on('data', function (data) {
    return (0, _console.log)(data.toString());
  });
  prog.stderr.on('data', function (data) {
    return (0, _console.log)(data.toString());
  });
  prog.stderr.on('error', function (data) {
    return (0, _console.log)(data.toString());
  });
  prog.on('close', function (code) {
    return (0, _console.log)("Exited with code");
  });
  return prog;
}

function checkProcess(_x2) {
  return _checkProcess.apply(this, arguments);
}

function _checkProcess() {
  _checkProcess = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(p) {
    var processes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return pRun("sudo ps -aux");

          case 2:
            processes = _context.sent;
            return _context.abrupt("return", processes.split('\n').filter(function (p) {
              return p.includes("".concat(p));
            }).map(function (p) {
              return p.split(' ').filter(function (p) {
                return p !== '';
              })[1];
            }).length);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkProcess.apply(this, arguments);
}

function localFwd(_x3, _x4) {
  return _localFwd.apply(this, arguments);
}

function _localFwd() {
  _localFwd = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(remoteHost, remotePort) {
    var localHost,
        localPort,
        monPort,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            localHost = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : '127.0.0.1';
            localPort = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 21099;
            monPort = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 31099;
            _context2.next = 5;
            return pRun("autossh -M ".concat(monPort, " -L ").concat(localHost, ":").concat(localPort, ":").concat(remoteHost, ":").concat(remotePort));

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _localFwd.apply(this, arguments);
}

function getOpenPorts() {
  return _getOpenPorts.apply(this, arguments);
}

function _getOpenPorts() {
  _getOpenPorts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var tmp, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return pRun("sudo netstat -tulnp");

          case 2:
            _context3.t0 = function (x) {
              return x.split(' ').filter(function (_x) {
                return _x !== '';
              });
            };

            tmp = _context3.sent.trim().split('\n').map(_context3.t0);
            tmp.shift();
            tmp.shift();
            result = tmp.map(function (x) {
              // Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name 
              // log(x)
              var state = x[5].includes('/') ? '' : x[5];
              var pidChicks = state === '' ? x[5].split('/') : x[6].split('/');
              var pid = pidChicks[0];
              var program = pidChicks[1];
              if (typeof x[6] !== 'undefined' && !x[6].includes('/')) program += " ".concat(x[6]);
              var _tmp = {
                proto: x[0],
                recv: x[1],
                send: x[2],
                localAddress: x[3],
                foreignAddress: x[4],
                state: state,
                pid: pid,
                program: program
              };
              return _tmp;
            });
            return _context3.abrupt("return", result);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getOpenPorts.apply(this, arguments);
}

function isPortOpen(_x5) {
  return _isPortOpen.apply(this, arguments);
}

function _isPortOpen() {
  _isPortOpen = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(port) {
    var ports;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getOpenPorts();

          case 2:
            ports = _context4.sent;
            return _context4.abrupt("return", ports.filter(function (la) {
              var _chunks = la.localAddress.split(':');

              (0, _console.log)(_chunks[_chunks.length - 1] === port);
            }));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _isPortOpen.apply(this, arguments);
}

function getRandPort() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1025;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 65665;
  var port = parseInt((0, _crypto.randomBytes)(5).toString('hex'));
  if (typeof port !== 'number' || isNaN(port)) return getRandPort(min, max);
  if (port < min || port > max) return getRandPort(min, max);
  return port;
}