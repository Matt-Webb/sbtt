/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
 */

"use strict";

// dependencies
import uuidV1 from "uuid/v1";
import	moment from "moment";

// constructor
const Presenter = function( args ) {
	this.id = uuidV1();
	this.created = moment().unix();
	this.firstName = args.firstName;
	this.secondName = args.secondName;
};

// basic prototype method
Presenter.prototype.fullName = function() {
	return `${this.firstName} ${this.secondName}`;
};

// basic object literal used for saving to the database
Presenter.prototype.toObj = function() {
	const data = {
		id: this.id,
		created: this.created,
		firstName: this.firstName,
		secondName: this.secondName,
		fullName: this.fullName()
	};

	return data; // JSON.stringify( data ); // moved onto service.database.
};

// interface
export default Presenter;
