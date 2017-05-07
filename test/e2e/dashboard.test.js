import "babel-polyfill"

import chai from "chai"
chai.should()

describe("Main page", () => {

  it("looking for projects", async() => {
    browser.get("http://localhost:3001")

    const title = await browser.getTitle()
    title.should.be.equal("Scraaaam")

    const cantidadOriginal = await element.all(by.css("projectlist project")).count()

    await browser.takeScreenshot()

    await element(by.css("projectlist a[href='#newProject']")).click()

    element(by.css("newproject input[name=title]")).sendKeys("ProtractorProject")
    element(by.css("newproject textarea[name=description]")).sendKeys("this is actually being saved")
    await element(by.css("newproject form button")).click()

    const cantidad = await element.all(by.css("projectList project")).count()
    cantidad.should.be.equal(cantidadOriginal + 1)
  });

})
