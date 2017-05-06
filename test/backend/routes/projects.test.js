import chai from "chai"
import sinon from "sinon"
import request from "supertest"
import app from "../../../src/backend/index"

import { setupMocha } from "../../setup"

const expect = chai.expect

describe("All routes", () => {

	setupMocha();

	describe("POST /porjects", () => {

		it("Un proyecto comun", async() => {
			const response = await request(app)
				.post("/projects")
				.send({ "title": "This is Scraam!!", "description": "The description"	})
				.expect(201);

			const body = response.body
			expect(body).to.have.property("title", "This is Scraam!!")
			expect(body).to.have.property("description", "The description")
			expect(body).to.have.property("tasks").to.be.empty
			expect(body).to.have.property("_id")
		})
	})

});
