import chai from "chai"
import sinon from "sinon"
import request from "supertest"
import { setupMocha } from "../../setup"
import app from "../../../src/backend/app"
import Project from "../../../src/backend/models/Project"
import Task from "../../../src/backend/models/Task"
const expect = chai.expect

describe("All routes", () => {

	setupMocha()

  let response, project, task

  beforeEach("starting with a project", async() => {
    project = await Project.fullCreate({ "title": "This is Scraam!!", "description": "The description"	})
    task = await Task.fullCreate(project, { "title": "Es ist eine schöne task", "description": "etwas"	})
  })

	describe("POST /projects/projectId/tasks/aTask/comments", () => {

    beforeEach("starting with a project", async() => {
      response = await request(app)
        .post(`/projects/${project._id}/tasks/${task._id}/comments`)
        .send({ "content": "Extra extra" })
        .expect(201);
    })


		it("Un comentario comun", async() => {

			const body = response.body
			expect(body).to.have.property("content", "Extra extra")
			expect(body).to.have.property("_id")
		})

		describe("GET /projects/:aProject/tasks/aTask/comments", () => {

			it("Lista de comments", async() => {
				response = await request(app)
					.get(`/projects/${project._id}/tasks/${task._id}/comments`)
					.expect(200);

				const body = response.body
				expect(body).length(1)
			})
		})
	})
});
