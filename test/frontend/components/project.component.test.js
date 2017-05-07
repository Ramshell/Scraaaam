import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"

chai.should()
chai.use(sinonChai)

import { By } from "@angular/platform-browser"
import { TestBed } from "@angular/core/testing"

import ProjectComponent from "../../../src/frontend/app/components/project.component"

describe("ProjectListComponent", () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectComponent]
    });
    fixture = TestBed.createComponent(ProjectComponent);
  })

  it("header should contain data.title as interpolated text", () => {
    fixture.componentInstance.data = {
      "_id": "id1",
      "title": "Some title",
      "description": "Some description",
      tasks: []
    }
    fixture.detectChanges()

    fixture.debugElement.query(By.css("h4")).nativeElement
          .innerHTML.should.be.equal("Some title")

    fixture.componentInstance.data.title = "Some title 2"
    fixture.detectChanges()

    fixture.debugElement.query(By.css("h4")).nativeElement
          .innerHTML.should.be.equal("Some title 2")
  })
})
