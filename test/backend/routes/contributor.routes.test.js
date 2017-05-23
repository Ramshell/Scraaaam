import chai from "chai"
import sinon from "sinon"
import request from "supertest"
import { setupMocha } from "../../setup"
import app from "../../../src/backend/app"
const expect = chai.expect

describe("All routes", () => {

	setupMocha()

  let response

	describe("POST /contributors", () => {

    beforeEach("starting with a contributor", async() => {
      response = await request(app)
        .post(`/contributors`)
        .send({ "name": "Pepita"	})
        .expect(201);
    })


		it("Una contributor comun", async() => {

			const body = response.body
			expect(body).to.have.property("name", "Pepita")
			expect(body).to.have.property("_id")
		})

		describe("GET /contributors", () => {

			it("Lista de contributors", async() => {
				response = await request(app)
					.get(`/contributors`)
					.expect(200);

				const body = response.body
				expect(body).length(1)
			})
		})
		describe("DELETE /contributors/:aContributor", () => {

			it("Borrar un contributor", async() => {
				response = await request(app)
					.delete(`/contributors/${response.body._id}`)
					.expect(202);

				response = await request(app)
					.get(`/contributors`)
					.expect(200);

				const body = response.body
				expect(body).length(0)
			})
		})

		describe("PUT /contributors/:aContributor", () => {

			it("Modificar contributor en particular", async() => {
				let body = response.body
				body.name = "Modified"
				response = await request(app)
					.put(`/contributors/${body._id}`)
					.send(body)
					.expect(200);

				response = await request(app)
					.get(`/contributors/${body._id}`)
					.expect(200);

				body = response.body
				expect(body.name).to.equal("Modified")
			})
		})
	})
});
