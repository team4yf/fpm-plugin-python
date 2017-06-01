"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  bind: function bind(fpm) {
    fpm.registerAction('BEFORE_MODULES_ADDED', function (args) {
      var biz = args[0];
      var c = fpm.getConfig();
      biz.m = _lodash2.default.assign(biz.m, {
        script: {
          python: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(arg) {
              var projectRoot, project, script, scriptPath, params, paramStr;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      projectRoot = c.pythonDir || '';
                      project = arg.project;
                      script = arg.script;
                      scriptPath = _path2.default.join(projectRoot, project, script);

                      if (_fs2.default.existsSync(scriptPath)) {
                        _context.next = 6;
                        break;
                      }

                      return _context.abrupt('return', {
                        code: -1,
                        message: 'script file not exists!'
                      });

                    case 6:
                      params = arg.params || [];
                      paramStr = params.join(' ');
                      return _context.abrupt('return', new _promise2.default(function (rs, rj) {
                        (0, _child_process.exec)('python ' + scriptPath + ' ' + paramStr, function (err, stdout, stderr) {
                          if (err) {
                            rj(err);
                            return;
                          }
                          if (stdout.length > 1) {
                            var str = stdout.toString();

                            rs({
                              data: JSON.parse(str)
                            });
                          } else {
                            rs({
                              data: {}
                            });
                          }
                        });
                      }));

                    case 9:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function python(_x) {
              return _ref.apply(this, arguments);
            };
          }()
        }
      });
    });
  }
};