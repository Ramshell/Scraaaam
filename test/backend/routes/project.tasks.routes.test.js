import chai from "chai"
import sinon from "sinon"
import request from "supertest"
import { setupMocha } from "../../setup"
import app from "../../../src/backend/app"
import Project from "../../../src/backend/models/Project"
const expect = chai.expect

describe("All routes", () => {

	setupMocha()

  let response, project

	describe("POST /projects/projectId/tasks", () => {

    beforeEach("starting with a project", async() => {
			project = await Project.fullCreate({ "title": "This is Scraam!!", "description": "The description"	})
      response = await request(app)
        .post(`/projects/${project._id}/tasks`)
        .send({ "title": "This is a Scraam task!!", "description": "Other The description"	})
        .expect(201);
    })


		it("Una tarea comun", async() => {

			const body = response.body
			expect(body).to.have.property("title", "This is a Scraam task!!")
			expect(body).to.have.property("description", "Other The description")
			expect(body).to.have.property("tasks").to.be.empty
			expect(body).to.have.property("_id")
		})

		describe("GET /projects/:aProject/tasks/all", () => {

			it("Lista de tareas", async() => {
				response = await request(app)
					.get(`/projects/${project._id}/tasks/all`)
					.expect(200);

				const body = response.body
				expect(body).length(1)
			})
		})

		describe("GET /projects/:aProject/tasks", () => {

			it("Lista de tareas", async() => {
				response = await request(app)
					.get(`/projects/${project._id}/tasks`)
					.expect(200);

				const body = response.body
				expect(body).length(1)
			})
		})
		describe("DELETE /projects/:aProject/tasks/:aTask", () => {

			it("Borrar una tarea", async() => {
				response = await request(app)
					.delete(`/projects/${project._id}/tasks/${response.body._id}`)
					.expect(200);

				response = await request(app)
					.get(`/projects/${project._id}/tasks`)
					.expect(200);

				const body = response.body
				expect(body).length(0)
			})
		})

		describe("GET /projects/:aProject/tasks/:aTask", () => {

			it("Get a una tarea en particular", async() => {
				const body = response.body
				response = await request(app)
					.get(`/projects/${project._id}/tasks/${body._id}`)
					.expect(200);

				const theBody = response.body
				expect(theBody._id).to.equal(body._id)
				expect(theBody.title).to.equal(body.title)
				expect(theBody).to.have.property("allowedCategories")
			})

			it("Get el history de una tarea en particular", async() => {
				const body = response.body
				response = await request(app)
					.get(`/projects/${project._id}/tasks/${body._id}/history`)
					.expect(200);

				const theBody = response.body
				expect(theBody).length(2)
			})
		})

		describe("PUT /projects/:aProject/tasks/:aTask", () => {

			it("Modificar una tarea en particular", async() => {
				let body = response.body
				body.title = "Modified"
				response = await request(app)
					.put(`/projects/${project._id}/tasks/${body._id}`)
					.send(body)
					.expect(200);

				response = await request(app)
					.get(`/projects/${project._id}/tasks/${body._id}`)
					.expect(200);

				body = response.body
				expect(body.title).to.equal("Modified")
			})
		})
	})
});
