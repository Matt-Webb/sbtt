"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*!
                                                                                                                                                                                                                                                                               * SkyBet Tech Test
                                                                                                                                                                                                                                                                               * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
                                                                                                                                                                                                                                                                               * MIT Licensed
                                                                                                                                                                                                                                                                              */

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _model = require("../model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it beforeEach */

describe("Model", function () {

	describe("Presenter", function () {

		var presenter = void 0;

		beforeEach(function () {
			presenter = new _model2.default({ firstName: "Jeff", secondName: "Stelling" });
		});

		it("should return a fullName property", function () {
			(0, _assert2.default)(typeof presenter.fullName === "function");
			(0, _assert2.default)(presenter.fullName());
			(0, _assert2.default)(presenter.fullName() === "Jeff Stelling");
		});

		it("should return a id property", function () {
			(0, _assert2.default)(presenter.id);
			(0, _assert2.default)(presenter.id.length === 36);
		});

		it("should return a date property", function () {
			(0, _assert2.default)(presenter.created);
			(0, _assert2.default)(typeof presenter.created === "number");
		});

		it("should return an object literal from .toObj()", function () {
			(0, _assert2.default)(typeof presenter.toObj === "function");

			var presenterObj = presenter.toObj();

			(0, _assert2.default)(presenterObj);
			(0, _assert2.default)((typeof presenterObj === "undefined" ? "undefined" : _typeof(presenterObj)) === "object");
		});
	});
});