"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Proxy = void 0;

var _console = require("console");

var _fs = require("fs");

var _utils = require("./utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Proxy =
/*#__PURE__*/
function () {
  function Proxy(host, port) {
    var user = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var password = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, Proxy);

    this.host = host || null;
    this.port = port || null;
    this.user = user || false;
    this.password = password || false;
    this.uri = "";
    this.proxyFile = process.env.HOME + '/.bash_proxy';
  }

  _createClass(Proxy, [{
    key: "setProxy",
    value: function () {
      var _setProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var host,
            port,
            user,
            password,
            toWrite,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                host = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
                port = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                user = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
                password = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;

                if (host) {
                  _context.next = 9;
                  break;
                }

                if (this.host) {
                  _context.next = 7;
                  break;
                }

                throw new Error('No proxy host selected');

              case 7:
                _context.next = 10;
                break;

              case 9:
                this.host = host;

              case 10:
                if (port) {
                  _context.next = 15;
                  break;
                }

                if (this.port) {
                  _context.next = 13;
                  break;
                }

                throw new Error('No proxy port selected');

              case 13:
                _context.next = 16;
                break;

              case 15:
                this.port = port;

              case 16:
                toWrite = "export HTTP_PROXY=".concat(this.httpProxy, "\nexport HTTPS_PROXY=").concat(this.httpsProxy, "\nexport FTP_PROXY=").concat(this.ftpProxy, "\nexport ALL_PROXY=").concat(this.allProxy, "\nexport NO_PROXY=").concat(this.noProxy, "\nexport http_proxy=").concat(this.httpProxy, "\nexport https_proxy=").concat(this.httpsProxy, "\nexport ftp_proxy=").concat(this.ftpProxy, "\nexport all_proxy=").concat(this.allProxy, "\nexport no_proxy=").concat(this.noProxy);
                (0, _fs.writeFileSync)(this.proxyFile, toWrite);
                _context.prev = 18;
                _context.next = 21;
                return this.npmProxy();

              case 21:
                _context.next = 23;
                return this.yarnProxy();

              case 23:
                _context.next = 25;
                return this.dockerProxy();

              case 25:
                _context.next = 27;
                return this.gitProxy();

              case 27:
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t0 = _context["catch"](18);
                throw new Error("Error setting proxy");

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[18, 29]]);
      }));

      function setProxy() {
        return _setProxy.apply(this, arguments);
      }

      return setProxy;
    }()
  }, {
    key: "unsetProxy",
    value: function () {
      var _unsetProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _console.log)("Unsetting proxy");
                (0, _fs.writeFileSync)(this.proxyFile, '', {
                  flags: 'w'
                });
                _context2.prev = 2;
                _context2.next = 5;
                return (0, _utils.pRun)("git config --global http.proxy ".concat(this.httpProxy));

              case 5:
                _context2.next = 7;
                return (0, _utils.pRun)("git config --global https.proxy ".concat(this.httpsProxy));

              case 7:
                _context2.next = 9;
                return (0, _utils.pRun)("npm config delete proxy");

              case 9:
                _context2.next = 11;
                return (0, _utils.pRun)("npm config delete https-proxy");

              case 11:
                _context2.next = 13;
                return (0, _utils.pRun)("npm config delete http_proxy");

              case 13:
                _context2.next = 15;
                return (0, _utils.pRun)("npm config delete https_proxy");

              case 15:
                _context2.next = 17;
                return (0, _utils.pRun)("yarn config delete http-proxy");

              case 17:
                _context2.next = 19;
                return (0, _utils.pRun)("yarn config delete http_proxy");

              case 19:
                _context2.next = 21;
                return (0, _utils.pRun)("yarn config delete proxy");

              case 21:
                _context2.next = 23;
                return (0, _utils.pRun)("yarn config delete https-proxy");

              case 23:
                _context2.next = 25;
                return (0, _utils.pRun)("yarn config delete https_proxy");

              case 25:
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](2);
                throw new Error("");

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 27]]);
      }));

      function unsetProxy() {
        return _unsetProxy.apply(this, arguments);
      }

      return unsetProxy;
    }()
  }, {
    key: "gitProxy",
    value: function () {
      var _gitProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _console.log)("Setting proxy from git");
                _context3.prev = 1;
                _context3.next = 4;
                return (0, _utils.pRun)("git config --global http.proxy ".concat(this.httpProxy));

              case 4:
                _context3.next = 6;
                return (0, _utils.pRun)("git config --global https.proxy ".concat(this.httpsProxy));

              case 6:
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                throw new Error("Error setting config", {
                  e: _context3.t0
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function gitProxy() {
        return _gitProxy.apply(this, arguments);
      }

      return gitProxy;
    }()
  }, {
    key: "npmProxy",
    value: function () {
      var _npmProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _console.log)("Setting proxy from npm");
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _utils.pRun)("npm config set proxy ".concat(this.httpProxy));

              case 4:
                _context4.next = 6;
                return (0, _utils.pRun)("npm config set https-proxy ".concat(this.httpsProxy));

              case 6:
                _context4.next = 8;
                return (0, _utils.pRun)("npm config set http_proxy ".concat(this.httpProxy));

              case 8:
                _context4.next = 10;
                return (0, _utils.pRun)("npm config set https_proxy ".concat(this.httpsProxy));

              case 10:
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](1);
                throw new Error("Error setting config ".concat(_context4.t0), {
                  e: _context4.t0
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 12]]);
      }));

      function npmProxy() {
        return _npmProxy.apply(this, arguments);
      }

      return npmProxy;
    }()
  }, {
    key: "yarnProxy",
    value: function () {
      var _yarnProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _console.log)("Setting proxy from yarn");
                _context5.prev = 1;
                _context5.next = 4;
                return (0, _utils.pRun)("yarn config set http-proxy ".concat(this.httpProxy));

              case 4:
                _context5.next = 6;
                return (0, _utils.pRun)("yarn config set http_proxy ".concat(this.httpProxy));

              case 6:
                _context5.next = 8;
                return (0, _utils.pRun)("yarn config set proxy ".concat(this.httpProxy));

              case 8:
                _context5.next = 10;
                return (0, _utils.pRun)("yarn config set https-proxy ".concat(this.httpsProxy));

              case 10:
                _context5.next = 12;
                return (0, _utils.pRun)("yarn config set https_proxy ".concat(this.httpsProxy));

              case 12:
                _context5.next = 17;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](1);
                throw new Error("Error setting config", {
                  e: _context5.t0
                });

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 14]]);
      }));

      function yarnProxy() {
        return _yarnProxy.apply(this, arguments);
      }

      return yarnProxy;
    }()
  }, {
    key: "dockerProxy",
    value: function () {
      var _dockerProxy = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                (0, _console.log)("Setting proxy from docker");
                _context6.prev = 1;
                _context6.next = 7;
                break;

              case 4:
                _context6.prev = 4;
                _context6.t0 = _context6["catch"](1);
                throw new Error("Error setting config", {
                  e: _context6.t0
                });

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 4]]);
      }));

      function dockerProxy() {
        return _dockerProxy.apply(this, arguments);
      }

      return dockerProxy;
    }()
  }, {
    key: "hostStr",
    get: function get() {
      var userStr = "";
      if (this.user && this.password) userStr = "".concat(this.user, ":").concat(this.password);
      if (this.user && !this.password) userStr = "".concat(this.user);
      if (userStr) userStr += "@";
      return this.uri = "".concat(userStr).concat(this.host, ":").concat(this.port);
    }
  }, {
    key: "allProxy",
    get: function get() {
      return "socks5://".concat(this.hostStr);
    }
  }, {
    key: "httpProxy",
    get: function get() {
      return "http://".concat(this.hostStr);
    }
  }, {
    key: "httpsProxy",
    get: function get() {
      return "http://".concat(this.hostStr);
    }
  }, {
    key: "ftpProxy",
    get: function get() {
      return "http://".concat(this.hostStr);
    }
  }, {
    key: "noProxy",
    get: function get() {
      return '127.0.0.0/8,localhost,' + this.host.split('.').splice(0, 3, /\d/).join('.') + '.0/24';
    }
  }]);

  return Proxy;
}();

exports.Proxy = Proxy;
var _default = Proxy;
exports["default"] = _default;