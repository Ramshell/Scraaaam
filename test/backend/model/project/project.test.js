import chai from "chai"
import Project from '../../../../src/backend/models/Project'
import Contributor from '../../../../src/backend/models/Contributor'
import Task from '../../../../src/backend/models/Task'
import { setupMocha } from "../../../setup.js"
const expect = chai.expect


describe("Project with 1 task and 0 contributors", () => {

	setupMocha();

	let project

	beforeEach("create project", async()=> {
		project = await Project.fullCreate({
	    title: "Scraaaam",
	    description: "This is cool bro",
	    tasks: [{title: "Scram task", description: "description task"}]
	  })
	})

  it("should have an id", () => {
    expect(project).to.have.property("_id")
  })
  it("should have 0 contributors", () => {
    expect(project).to.have.property("contributors").length(0)
  })
  it("should have 1 tasks", () => {
    expect(project).to.have.property("tasks").length(1)
  })
  it("should also save the task", async () => {
    expect(await Task.findById(project.tasks[0])).to.have.property("title", "Scram task")
  })

	it("delete the project", async () => {
		await project.delete()
		expect(await Project.findById(project._id)).to.be.null
	})

	it("Milestone is an allowed category", () => {
		expect(project.allowedCategories).to.include("Milestone")
	})

  describe("When add a contributor", () => {
    it("should save the contributor", async () => {
			const contribut = await Contributor.fullCreate({name: "Linus Torvalds"})
      const savedProject = await Project.addContributor(project, contribut)
      expect(savedProject).to.have.property("contributor").to.have.property("name", "Linus Torvalds")
    })
  })
})
