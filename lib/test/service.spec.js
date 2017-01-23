"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _model = require("../model");

var _model2 = _interopRequireDefault(_model);

var _service = require("../service");

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it beforeEach afterEach */

/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
 */

describe("Database", function () {

	var TEST_DIR = void 0,
	    db = void 0,
	    file = void 0,
	    pre1 = void 0,
	    pre2 = void 0;

	beforeEach(function (done) {
		TEST_DIR = _path2.default.join(_os2.default.tmpdir(), "presenters");
		file = _path2.default.join(TEST_DIR, "presenters.json");
		db = new _service2.default({
			file: file
		});
		pre1 = new _model2.default({
			firstName: "Jeff",
			secondName: "Stelling"
		}).toObj();
		pre2 = new _model2.default({
			firstName: "Heyley",
			secondName: "McQueen"
		}).toObj();

		_rimraf2.default.sync(TEST_DIR);
		_fs2.default.mkdir(TEST_DIR, done);
	});

	afterEach(function (done) {
		_rimraf2.default.sync(TEST_DIR);
		done();
	});

	describe("getPresenters()", function () {

		it("should read and parse JSON", function (done) {
			var presenter = {
				firstName: "Kirsty",
				secondName: "Gallacher"
			};

			_fs2.default.writeFileSync(file, JSON.stringify(presenter));

			db.getPresenters(function (err, arr) {
				_assert2.default.ifError(err);
				_assert2.default.equal(arr[0].firstName, presenter.firstName);
				done();
			});
		});

		it("should return an array with two presenters", function (done) {

			_fs2.default.writeFileSync(file, JSON.stringify(pre1));
			_fs2.default.writeFileSync(file, JSON.stringify(pre2));

			db.getPresenters(function (err, arr) {
				(0, _assert2.default)(arr instanceof Array);
				(0, _assert2.default)(arr.length === 1);
				done();
			});
		});

		it("should include the filename in error", function (done) {

			_fs2.default.writeFileSync(file, "{");

			db.getPresenters(function (err) {
				(0, _assert2.default)(err instanceof Error);
				(0, _assert2.default)(err.message.match(file));
				done();
			});
		});

		it("should call getPresenters method only once", function (done) {

			var spy = _sinon2.default.spy(db, "getPresenters");

			_fs2.default.writeFileSync(file, JSON.stringify(pre1));

			db.getPresenters(function (err) {
				_assert2.default.ifError(err);
				(0, _assert2.default)(spy.calledOnce);
				done();
			});
		});
	});

	describe("createPresenter()", function () {

		it("should create a json record", function (done) {
			db.createPresenter(pre1, function (err, data) {
				_assert2.default.ifError(err);
				(0, _assert2.default)(data);
			});
			_fs2.default.readFile(file, "utf8", function (err, data) {
				_assert2.default.ifError(err);
				(0, _assert2.default)(data, pre1);
				_assert2.default.deepEqual(data, pre1);
			});
			done();
		});

		// TODO: fix.
		it.skip("should error when trying to create duplicate a records", function (done) {

			_fs2.default.writeFileSync(file, JSON.stringify(pre1));

			db.createPresenter(pre1, function (err) {
				(0, _assert2.default)(err instanceof Error);
				(0, _assert2.default)(err.message.match(pre1.fullName));
			});
			done();
		});

		it("should call createPresenter method only once", function (done) {
			var spy = _sinon2.default.spy(db, "createPresenter");
			db.createPresenter(pre1, function (err) {
				_assert2.default.ifError(err);
				(0, _assert2.default)(spy.calledOnce);
			});
			done();
		});

		it("should call getPresenters method only once", function (done) {
			var spy = _sinon2.default.spy(db, "getPresenters");
			db.createPresenter(pre1, function (err) {
				_assert2.default.ifError(err);
				(0, _assert2.default)(spy.calledOnce);
			});
			done();
		});
	});
});