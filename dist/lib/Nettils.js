"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Nettils = void 0;

var _utils = require("./utils");

var _util = require("util");

var _child_process = require("child_process");

var _fs = require("fs");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Nettils =
/*#__PURE__*/
function () {
  function Nettils() {
    _classCallCheck(this, Nettils);

    this._localFwds = [];
  }

  _createClass(Nettils, [{
    key: "restartNetwork",
    value: function () {
      var _restartNetwork = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _utils.pRun)("sudo systemctl restart networking");

              case 2:
                _context.next = 4;
                return (0, _utils.pRun)("sudo systemctl restart NetworkManager");

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function restartNetwork() {
        return _restartNetwork.apply(this, arguments);
      }

      return restartNetwork;
    }()
  }, {
    key: "startNetwork",
    value: function () {
      var _startNetwork = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _utils.pRun)("sudo systemctl start networking");

              case 2:
                _context2.next = 4;
                return (0, _utils.pRun)("sudo systemctl start NetworkManager");

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function startNetwork() {
        return _startNetwork.apply(this, arguments);
      }

      return startNetwork;
    }()
  }, {
    key: "stopNetwork",
    value: function () {
      var _stopNetwork = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _utils.pRun)("sudo systemctl stop networking");

              case 2:
                _context3.next = 4;
                return (0, _utils.pRun)("sudo systemctl stop NetworkManager");

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function stopNetwork() {
        return _stopNetwork.apply(this, arguments);
      }

      return stopNetwork;
    }()
  }, {
    key: "localFwd",
    value: function () {
      var _localFwd = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(localHost, localPort, remoteHost, remotePort) {
        var monPort,
            options,
            cmd,
            args,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                monPort = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : null;
                options = _args4.length > 5 && _args4[5] !== undefined ? _args4[5] : ['-f', '-q', '-C', '-Nn'];
                if (!monPort) monPort = (0, _utils.getRandPort)(40000, 50000);
                cmd = "autossh  -M ".concat(monPort, " -L  ").concat(localHost, ":").concat(localPort, ":").concat(remoteHost, ":").concat(remotePort, "  ").concat(options.join(' '), " localhost");
                args = cmd.split(' ').filter(function (x) {
                  return x.trim() !== '';
                });
                cmd = args.shift();
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  var _data;

                  var out = (0, _fs.openSync)('./out.log', 'a');
                  var err = (0, _fs.openSync)('./out.log', 'a');
                  var prog = (0, _child_process.spawn)(cmd, args, {
                    detached: true,
                    stdio: ['ignore', out, err]
                  });

                  function addData(data) {
                    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
                    _data += data;
                    if (debug) (0, _util.log)(data);
                    return data;
                  } // prog.stdout.on('data', data => addData(data, 1))
                  // prog.stderr.on('data', data => addData(data, 1))
                  // prog.stderr.on('error', data => addData(data, 1))


                  prog.on('close', function (code) {
                    resolve({
                      _p: prog,
                      _data: _data
                    });
                  });
                  prog.unref();
                }));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function localFwd(_x, _x2, _x3, _x4) {
        return _localFwd.apply(this, arguments);
      }

      return localFwd;
    }()
  }]);

  return Nettils;
}();

exports.Nettils = Nettils;
var _default = Nettils;
exports["default"] = _default;