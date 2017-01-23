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

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// constructor
var Database = function Database(config) {
	this.file = config.file || undefined;
};

/**
 * Using the fs.readFile we return an array of json objects in a callback.
 *
 * @public
 * @param {String} file file location on disc for writing data.
 * @param {Function} callback function executed on return.
 * @returns {Function} Returns `function`.
 */
Database.prototype.getPresenters = function (callback) {

	var file = this.file;

	_fs2.default.readFile(file, function (err, data) {

		if (err) return callback(new Error(err));

		data = _utils2.default.strip(data);
		var arr = [];

		try {
			data.split("\n").forEach(function (record) {
				if (record !== "") {
					arr.push(JSON.parse(record));
				}
			});
		} catch (err2) {
			err2.message = file + " : " + err2.message;
			return callback(new Error(err2));
		}
		callback(null, arr);
	});
};

/**
 * Using the fs.writefile we write data to a file, checking for presence of existing record.
 *
 * @public
 * @param {String} file file location on disc for writing data.
 * @param {Object} presenter The object json stringified object to be written to the file.
 * @param {Function} callback function executed on return.
 * @returns {Function} Returns `function`.
 */
Database.prototype.createPresenter = function (presenter, callback) {

	var file = this.file;
	/**
  * Check if the record exists! Please advert your eyes ...
  * no indexing, no streaming, just a plain old read the entire file,
  * loop it and string match to return true if we find what we want.
  */
	this.getPresenters(function (err, data) {

		if (err) return callback(new Error(err));

		var exists = _utils2.default.exists(data, presenter.fullName, "fullName");

		if (exists) {
			return callback(new Error("Record for " + presenter.fullName + " already exists!"));
		} else {
			var str = "";
			try {
				str = JSON.stringify(presenter) + "\n"; // add line break
			} catch (err) {
				return callback(new Error(file + ": " + err), null);
			}

			_fs2.default.writeFile(file, str, {
				flag: "a" // allows data to be appended to the existing file.
			}, callback);
		}
	});
};

// interface
exports.default = Database;