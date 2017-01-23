"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _service = require("./service");

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
 */

exports.default = new _service2.default(_config2.default);