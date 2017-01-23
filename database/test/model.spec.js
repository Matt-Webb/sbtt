/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
*/

import assert from "assert";
import Presenter from "../model";

/* global describe it beforeEach */

describe( "Model", () => {

	describe( "Presenter", () => {

		let presenter;

		beforeEach(()=> {
			presenter = new Presenter( { firstName: "Jeff", secondName: "Stelling" } );
		});

		it("should return a fullName property", () => {
			assert(typeof presenter.fullName === "function");
			assert(presenter.fullName());
			assert(presenter.fullName() === "Jeff Stelling");
		});

		it("should return a id property", () => {
			assert(presenter.id);
			assert(presenter.id.length === 36);
		});

		it("should return a date property", () => {
			assert(presenter.created);
			assert(typeof presenter.created === "number");
		});

		it("should return an object literal from .toObj()", () => {
			assert(typeof presenter.toObj === "function");

			let presenterObj = presenter.toObj();

			assert(presenterObj);
			assert(typeof presenterObj === "object");
		});
	});
});
