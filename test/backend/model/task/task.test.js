import chai from "chai"
import Project from '../../../../src/backend/models/Project'
import Task from '../../../../src/backend/models/Task'
import BaseTask from '../../../../src/backend/models/BaseTask'
import { setupMocha } from "../../../setup.js"
const expect = chai.expect


describe("Task", () => {

	setupMocha();

	let task, project

	beforeEach("create project", async()=> {
		project = await Project.fullCreate({
	    title: "Scraaaam",
	    description: "This is cool bro",
	    tasks: [{title: "Scram task", description: "description task"}]
	  })
    await BaseTask.addSubtasks(project, project, [
      {
        title: "Make this tests work",
        description: "Be commited",
        category: "Milestone"
      }])
    task = await Task.findOne({
      title: "Make this tests work"
    }).populate("project")
	})

  afterEach("Deleting project", async () => {
    await project.delete()
  })

  it("should have an id", () => {
    expect(task).to.have.property("_id")
  })
  it("should have 0 tasks", async () => {
    expect(task).to.have.property("tasks").length(0)
  })

  it("should also save the task", async () => {
    expect(await Task.findById(task._id)).to.not.be.null
  })

  it("delete the project", async () => {
		await task.delete()
		expect(await Task.findById(task._id)).to.be.null
	})

  it("Epic is an allowed category", async () => {
		expect(task.allowedCategories).to.include("Epic")
	})
})
