import chai from "chai"
import Project from '../src/backend/models/Project'
import Contributor from '../src/backend/models/Contributor'
import Task from '../src/backend/models/Task'
import mongoose from "mongoose"
import mockgoose from "mockgoose"
const expect = chai.expect

// before((done) => {
// 	mockgoose.prepareStorage().then(function() {
// 		mongoose.connect('mongodb://localhost/projects', function(err) {
// 			done(err);
// 		});
// 	});
// });
//
// after(() => {
//   mockgoose.helper.reset()
// })
//
// after((done) => {
// 	if ( mockgoose.helper.isMocked() === true ) {
// 		console.log("asd")
// 		done()
// 	}
// })

describe("Project with 1 task and 0 contributors", () => {


	before("Mock mongoose", async() => {
		await mockgoose(mongoose)
		mongoose.connect('mongodb://localhost/projects')
	})

	after("Restore mongoose", done => {
  	mongoose.unmock(done);
	})

	afterEach("Reset mock mongo database", done => {
	  mockgoose.reset(done);
	})

	let project

	beforeEach("create project", async()=> {
		project = Project.fullCreate({
	    title: "Scraaaam",
	    description: "This is cool bro",
	    tasks: [{title: "Scram task", description: "description task"}]
	  })
	})

  it("should have an id", async () => {
    expect(await project).to.have.property("_id")
  })
  it("should have 0 contributors", async () => {
    expect(await project).to.have.property("contributors").length(0)
  })
  it("should have 1 tasks", async () => {
    expect(await project).to.have.property("tasks").length(1)
  })
  it("should also save the task", async () => {
    const p = await project
    expect(await Task.findById(p.tasks[0])).to.have.property("title", "Scram task")
  })
  describe("When add a contributor", () => {
    it("should save the contributor", async () => {
			const contribut = await Contributor.fullCreate({name: "Linus Torvalds"})
      const proj = await project
      const savedProject = await Project.addContributor(proj, contribut)
      expect(savedProject).to.have.property("contributor").to.have.property("name", "Linus Torvalds")
    })
  })
})
