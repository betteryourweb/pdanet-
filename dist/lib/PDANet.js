"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PDANet = void 0;

var _os = require("os");

var _util = require("util");

var _rxjs = require("rxjs");

var _Proxy = _interopRequireDefault(require("./Proxy"));

var _Nettils = _interopRequireDefault(require("./Nettils"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var net = new _Nettils["default"]();

var PDANet =
/*#__PURE__*/
function () {
  function PDANet() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      timeout: 10000
    };

    _classCallCheck(this, PDANet);

    this.proxyHost = '192.168.49.1';
    this.proxyPort = 8000;
    this.proxyFile = process.env.HOME + '/.bash_proxy';
    this.timeout = opts.timeout || '10000';
    this.startDelay = opts.startDelay || '1000';
    this.subscriptions = {};
    this.service = 0;
    this.proxy = null;
  }

  _createClass(PDANet, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _util.log)("Initializing PDANet+ Proxy service");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "checkIP",
    value: function checkIP() {
      (0, _util.log)(this.getIfaces());
    }
  }, {
    key: "getIfaces",
    value: function getIfaces() {
      return Object.keys((0, _os.networkInterfaces)()).filter(function (x) {
        return x !== 'lo';
      }).map(function (iface) {
        return {
          iface: iface,
          info: (0, _os.networkInterfaces)()[iface]
        };
      });
    }
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _util.log)("Starting PDANet+ proxy service");
                this.subscriptions.start = this.watcher$().subscribe(function (x) {
                  (0, _util.log)('service:', _this.service);

                  if (!_this.isProxied()) {
                    var proxyFile = (0, _fs.readFileSync)(_this.proxyFile).toString();
                    if (proxyFile.trim() !== '') (0, _fs.writeFileSync)(_this.proxyFile, '');
                    _this.service = 0;
                    return (0, _util.log)("Not proxied");
                  }

                  if (_this.service === 1) return;
                  _this.service = 1;
                  (0, _util.log)("Setting Proxy");
                  (0, _rxjs.from)(_this.setProxy()).subscribe(function (_x) {
                    (0, _rxjs.from)(net.localFwd('127.0.0.1', 1080, '192.168.49.1', 8000)).subscribe(function (x) {
                      return (0, _util.log)('Setting forward', {
                        pid: x.pid
                      });
                    });
                  });
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _util.log)("Stopping PDANet+ proxy service");
                this.subscriptions.start.unsubscribe();

                if (this.proxy) {
                  this.proxy.unsetProxy();
                  delete this.proxy;
                  this.proxy = null;
                }

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "restart",
    value: function () {
      var _restart = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        var timeout,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                timeout = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 500;
                (0, _util.log)("Restarting PDANet+ proxy service");
                this.stop();
                setTimeout(function () {
                  return _this2.start();
                }, timeout);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function restart() {
        return _restart.apply(this, arguments);
      }

      return restart;
    }()
  }, {
    key: "watcher$",
    value: function watcher$() {
      return (0, _rxjs.timer)(this.startDelay, this.timeout);
    }
  }, {
    key: "isProxied",
    value: function isProxied() {
      var _is = false;
      (0, _util.log)("Checking if proxied");
      _is = !!this.getIfaces().map(function (iface) {
        var _homed = iface.info.filter(function (x) {
          return x.family === 'IPv4';
        });

        if (_homed.length === 1) return _homed;
      }).length;
      return _is;
    }
  }, {
    key: "setProxy",
    value: function () {
      var _setProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.proxy) this.proxy = new _Proxy["default"]("192.168.49.1", 8000);
                _context5.next = 3;
                return this.proxy.setProxy();

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setProxy() {
        return _setProxy.apply(this, arguments);
      }

      return setProxy;
    }()
  }]);

  return PDANet;
}();

exports.PDANet = PDANet;
var _default = PDANet;
exports["default"] = _default;