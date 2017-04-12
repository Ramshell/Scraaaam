import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class ProjectService {

  constructor(http) {
    this.http = http
    this._filter = ''
    this._allProjects = [
      { _id:"58d", title: "Cool project", description: "nothing", tasks: [] },
      { _id: "57d", title: "Other Cool project", description: "anything", tasks: [] }
    ]
    this._projects = this._allProjects
  }

  get projects() {
    return this._allProjects.filter((x) => x.title.includes(this._filter))
  }

  filterProjects(filter) {
    console.log(this._projects)
    this._filter = filter
    this._projects = this.projects
    console.log(this.projects)
  }

  getProject(id) {
    return this._projects[this._projects.map((x) => x._id).indexOf(id)]
  }
}

ProjectService.parameters = [
  Http
]
