import chai from "chai"
import Contributor from '../../../../src/backend/models/Contributor'
import { setupMocha } from "../../../setup.js"
const expect = chai.expect


describe("Contributor", () => {

	setupMocha();

	let contrib

	beforeEach("create Contributor", async()=> {
		contrib = await Contributor.fullCreate({
	    name: "Marcos"
	  })
	})

  it("should have an id", () => {
    expect(contrib).to.have.property("_id")
  })
  it("should have a name", () => {
    expect(contrib).to.have.property("name", "Marcos")
  })

  it("should be removed", async () => {
    await contrib.delete()
    expect(await Contributor.findById(contrib._id)).to.be.null
  })
})
