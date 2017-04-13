import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class ProjectService {

  constructor(http) {
    this.http = http
    this._filter = ''
    this._allProjects = []
    this.http.get("/projects").toPromise()
            .then(response => this._allProjects.push(...response.json()))
            .catch(err => console.log(err))
  }

  get projects() {
    return this._allProjects.filter((x) => x.title.includes(this._filter))
  }

  filterProjects(filter) {
    this._filter = filter
    this.projects
  }

  getProject(id) {
    return this.http.get(`/projects/${id}`).toPromise()
            .then(response => response.json());
  }

  create(project) {
    this.http.post("/projects", JSON.stringify(project), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(theProject => { this._allProjects.push(theProject.json()); this.projects })
            .catch(err => console.log(err))
  }

  create_task(id, task){
    
  }
}

ProjectService.parameters = [
  Http
]
