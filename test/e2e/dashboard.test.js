import "babel-polyfill"

import chai from "chai"
chai.should()

describe("Main page", () => {

  it("looking for projects and creating one", async() => {
    browser.get("http://localhost:3001")

    const title = await browser.getTitle()
    title.should.be.equal("Scraaaam")

    const cantidadOriginal = await element.all(by.css("projectlist project")).count()

    await browser.takeScreenshot()

    await element(by.css("projectlist newprojectbutton a")).click()

    await element(by.css("editprojectmodal input[name=title]")).sendKeys("ProtractorProject")
    await element(by.css("editprojectmodal textarea[name=description]")).sendKeys("this is actually being saved")
    await element(by.css("editprojectmodal form button")).click()

    const cantidad = await element.all(by.css("projectList project")).count()
    cantidad.should.be.equal(cantidadOriginal + 1)

    describe("Inside project", () => {
      it("enter a project and change current project", async () => {
        await element.all(by.css("projectlist a")).get(2).click()
        const project = await element.all(by.css("taskframe div[class='panel-heading'] div div")).first().getText()
        await element(by.css("a[class='dropdown-toggle']")).click()
        await element.all(by.css("ul li ul li a")).first().click()
        const otherProject = await element.all(by.css("taskframe div[class='panel-heading'] div div")).first().getText()
        project.should.to.not.equal(otherProject)
      })

      it("creates a milestones", async () => {
        const cantidadDeTasksOriginal = await element.all(by.css("tasklist task")).count()
        await createTask("Milestone", "Milestones Rules", "Very high level description")
        const cantidadActual = await element.all(by.css("tasklist task")).count()
        cantidadActual.should.be.equal(cantidadDeTasksOriginal + 1)
      })

      it("creates an epic", async () => {
        const cantidadDeTasksOriginal = await element.all(by.css("tasklist task")).count()
        await createTask("Epic", "Epic Rules", "not so high level description")
        const cantidadActual = await element.all(by.css("tasklist task")).count()
        cantidadActual.should.be.equal(cantidadDeTasksOriginal + 1)
      })

      it("creates a task", async () => {
        const cantidadDeTasksOriginal = await element.all(by.css("tasklist task")).count()
        await createTask("Normal", "Task Rules", "low level description")
        const cantidadActual = await element.all(by.css("tasklist task")).count()
        cantidadActual.should.be.equal(cantidadDeTasksOriginal + 1)
      })

      it("delete a task", async () => {
        const cantidadDeTasksOriginal = await element.all(by.css("tasklist task")).count()
        await element.all(by.css("tasklist task a button")).first().click()
        const cantidadActual = await element.all(by.css("tasklist task")).count()
        cantidadActual.should.be.equal(cantidadDeTasksOriginal - 1)
      })

      it("comment a task", async () => {
        await element.all(by.css("tasklist task")).first().click()
        await element.all(by.css("taskframe div[class='panel-heading'] button")).get(2).click()
        const cantidadDeCommentsOriginal = await element.all(by.css("taskframe commentlist div[class='collapse in'] comment")).count()
        await element(by.css("taskframe commentlist div[class='collapse in'] form textarea")).sendKeys("protractor comment")
        await element(by.css("taskframe commentlist div[class='collapse in'] form button")).click()
        const cantidadActual = await element.all(by.css("taskframe commentlist div[class='collapse in'] comment")).count()
        cantidadActual.should.be.equal(cantidadDeCommentsOriginal + 1)
      })
    })
  })
})


const createTask = async (kind, name, description) => {
  await element(by.css("newtaskbutton a")).click()
  await element(by.css("edittaskmodal input[name=title]")).sendKeys(name)
  await element(by.css("edittaskmodal textarea[name=description]")).sendKeys(description)
  await element(by.css("edittaskmodal select")).sendKeys(kind)
  return element(by.css("edittaskmodal form button")).click()
}
