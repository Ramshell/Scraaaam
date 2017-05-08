import chai from "chai"
import sinon from "sinon"
import request from "supertest"
import { setupMocha } from "../../setup"
import app from "../../../src/backend/app"
const expect = chai.expect

describe("All routes", () => {

	setupMocha()

	describe("POST /projects", () => {
		let response

		beforeEach("setting response", async() => {
			response = await request(app)
				.post("/projects")
				.send({ "title": "This is Scraam!!", "description": "The description"	})
				.expect(201);
		})

		it("Un proyecto comun", async() => {

			const body = response.body
			expect(body).to.have.property("title", "This is Scraam!!")
			expect(body).to.have.property("description", "The description")
			expect(body).to.have.property("tasks").to.be.empty
			expect(body).to.have.property("_id")
		})

		describe("GET /projects", () => {

			it("Lista de proyectos", async() => {
				response = await request(app)
					.get("/projects")
					.expect(200);

				const body = response.body
				expect(body).length(1)
			})
		})
		describe("DELETE /projects/:aProject", () => {

			it("Borrar un proyecto", async() => {
				let body = response.body
				response = await request(app)
					.delete(`/projects/${body._id}`)
					.expect(200);

				response = await request(app)
					.get(`/projects`)
					.expect(200);

				body = response.body
				expect(body).length(0)
			})
		})
	})
});
