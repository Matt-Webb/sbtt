/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
 */

"use strict";

/**
 * This is a primative / sightly "over-engineered" example of a utility you might create in order to
 * reduce complexity and increase re-usability across your package / application.
 *
 * @namespace Utils { exists, extract, strip }
 * @name Helper
 */

function Helper() {}

/**
 * Checks for existing records in an Array of Objects
 *
 * @public
 * @param {Array} data The data used to check against.
 * @param {Object} item The object we are looking for within the data.
 * @param {String} prop The object properly we match both data and item against.
 * @returns {Boolean} Returns `true`.
 */
Helper.prototype.exists = function ( data, item, prop ) {

	if ( !Array.isArray( data ) ) return false;

	return data.some( record => record[ prop ] === item[ prop ] );
};

/**
 * Finds and returns existing records in an Array of Objects
 *
 * @public
 * @param {Array} data The data used to check against.
 * @param {Object} item The object we are looking for within the data.
 * @param {String} prop The object properly we match both data and item against.
 * @returns {Object} Returns `object`.
 */
Helper.prototype.extract = function ( data, item, prop ) {

	if ( !Array.isArray( data ) ) return;
	return data.filter( record => record[ prop ] === item[ prop ] )[ 0 ] || undefined;
};

/**
 * JSON.parse would convert this to a utf8 string if encoding wasn't specified
 *
 * @public
 * @param {Object} data json object
 * @returns {Object} Returns `object`.
 */
Helper.prototype.strip = function ( data ) {
	if ( Buffer.isBuffer( data ) ) {
		data = data.toString( "utf8" );
	}
	data = data.replace( /^\uFEFF/, "" );

	return data;
};

// interface
export default new Helper(); // singleton!
