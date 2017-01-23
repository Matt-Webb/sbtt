"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*!
                                                                                                                                                                                                                                                                               * SkyBet Tech Test
                                                                                                                                                                                                                                                                               * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
                                                                                                                                                                                                                                                                               * MIT Licensed
                                                                                                                                                                                                                                                                               */

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it beforeEach */

describe("Utilities", function () {

	describe("helper", function () {

		var data = void 0,
		    helper = void 0,
		    prop = void 0;

		beforeEach(function (done) {
			data = [{
				name: "Jeff Stelling"
			}, {
				name: "Kirsy Gallacher"
			}, {
				name: "Hayley McQueen"
			}];
			helper = _utils2.default;
			prop = "name";
			done();
		});

		describe("exists()", function () {
			it("should return TRUE if object value is found in database", function (done) {
				var item = {
					name: "Jeff Stelling"
				};
				(0, _assert2.default)(helper.exists(data, item, prop));
				done();
			});

			it("should return FALSE if object value is NOT found in database", function (done) {
				var item = {
					name: "Legend Jeff"
				};
				var prop = "name";
				(0, _assert2.default)(!helper.exists(data, item, prop));
				done();
			});

			it("should return FALSE if data is not an Array", function (done) {
				var data = {
					name: "Jeff Stelling"
				};
				var item = {
					name: "Jeff Stelling"
				};
				(0, _assert2.default)(!helper.exists(data, item, prop));
				done();
			});
		});

		describe("extract()", function () {

			it("should return object from the database", function (done) {
				var item = {
					name: "Jeff Stelling"
				};
				var record = helper.extract(data, item, prop);
				(0, _assert2.default)((typeof record === "undefined" ? "undefined" : _typeof(record)) === "object");
				(0, _assert2.default)(record.name === item.name);
				_assert2.default.deepEqual(record, item);
				done();
			});

			it("should return undefined when object is not in database", function (done) {
				var item = {
					name: "Insanely Hot McQueen"
				};
				var record = helper.extract(data, item, prop);
				(0, _assert2.default)(!record);
				done();
			});

			it("should return undefined when object is not in database", function (done) {
				var item = {
					name: "Insanely Hot McQueen"
				};
				var record = helper.extract(data, item, prop);
				(0, _assert2.default)(!record);
				done();
			});
		});

		describe("strip", function () {

			it("should properly parse", function (done) {
				var missFormedItem = "\uFEFF" + JSON.stringify({
					name: "Kirsy Gallacher"
				});
				var item = JSON.stringify({
					name: "Kirsy Gallacher"
				});
				var obj = helper.strip(missFormedItem);
				_assert2.default.deepEqual(obj, item);
				done();
			});
		});
	});
});