import chai from "chai"
import Project from '../../../../src/backend/models/Project'
import Task from '../../../../src/backend/models/Task'
import Comment from '../../../../src/backend/models/Comment'
import { setupMocha } from "../../../setup.js"
const expect = chai.expect


describe("Task", () => {

	setupMocha();

	let comment, task

	beforeEach("create project", async()=> {
    task = await Task.create({
      title: "Make this tests work",
      description: "bleh"
    })
    comment = await Comment.fullCreate(task, {content: "Extra extra!"})
	})

  it("should have an id", async() => {
    expect(comment).to.have.property("_id")
  })
  it("should have a content", async () => {
    expect(comment).to.have.property("content", "Extra extra!")
  })

  it("delete the project", async () => {
		await comment.delete()
		expect(await Comment.findById(comment._id)).to.be.null
	})
})
