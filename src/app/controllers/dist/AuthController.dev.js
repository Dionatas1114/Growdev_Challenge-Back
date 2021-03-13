"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _Growdever = _interopRequireDefault(require("../models/Growdever"));

var _auth = _interopRequireDefault(require("../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: "store",
    value: function store(req, res) {
      var _req$body, email, password, user, uid, name;

      return regeneratorRuntime.async(function store$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context.next = 4;
              return regeneratorRuntime.awrap(_User["default"].findOne({
                where: {
                  email: email
                }
              }));

            case 4:
              user = _context.sent;

              if (user) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                error: 'Usuario não encontrado'
              }));

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(user.checkPassword(password));

            case 9:
              if (_context.sent) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                error: 'Senha incorreta'
              }));

            case 11:
              uid = user.uid, name = user.name;
              return _context.abrupt("return", res.json({
                user: {
                  name: name,
                  email: email
                },
                token: _jsonwebtoken["default"].sign({
                  uid: uid
                }, _auth["default"].secret, {
                  expiresIn: _auth["default"].expiresIn
                })
              }));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.json({
                success: false,
                error: _context.t0
              }));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 15]]);
    }
  }]);

  return AuthController;
}();

var _default = new AuthController();

exports["default"] = _default;