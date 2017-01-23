/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
 */

"use strict";

// dependencies

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _v = require("uuid/v1");

var _v2 = _interopRequireDefault(_v);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// constructor
var Presenter = function Presenter(args) {
	this.id = (0, _v2.default)();
	this.created = (0, _moment2.default)().unix();
	this.firstName = args.firstName;
	this.secondName = args.secondName;
};

// basic prototype method
Presenter.prototype.fullName = function () {
	return this.firstName + " " + this.secondName;
};

// basic object literal used for saving to the database
Presenter.prototype.toObj = function () {
	var data = {
		id: this.id,
		created: this.created,
		firstName: this.firstName,
		secondName: this.secondName,
		fullName: this.fullName()
	};

	return data; // JSON.stringify( data ); // moved onto service.database.
};

// interface
exports.default = Presenter;