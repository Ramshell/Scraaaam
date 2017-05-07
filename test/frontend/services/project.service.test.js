import chai from "chai"
import sinon from "sinon"
import ProjectService from "../../../src/frontend/app/services/project.service"
import { setupBackendApp } from "../../setup"

const expect = chai.expect

describe("Project service", () => {
	let http
	let projectService
  beforeEach(async() => {
    http = {
      get() {
      }
    }

    sinon.stub(http, "get")
    http.get.withArgs("/projects").returns(createResponse([{
			title: "Blah",
			description: "Bleh",
			tasks: []
		}]));

    projectService = new ProjectService(http)
    await tick();
  })

	it("Project rules", () => {
		sinon.assert.calledOnce(http.get)
	});
})

function createResponse(obj){
	return {
		toPromise(){ return Promise.resolve(JSON.stringify(obj))}
	}
}

function tick() {
  return Promise.resolve("")
}
