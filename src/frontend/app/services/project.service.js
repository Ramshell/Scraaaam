import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class ProjectService {

  constructor(http) {
    this.http = http
    this._projects = [
      { _id:"58d", title: "Cool project", description: "nothing", tasks: [] },
      { _id: "57d", title: "Other Cool project", description: "anything", tasks: [] }
    ]
  }

  get projects() {
    return this._projects
  }

  getProject(id) {
    return this._projects[this._projects.map((x) => x._id).indexOf(id)]
  }
}

ProjectService.parameters = [
  Http
]
