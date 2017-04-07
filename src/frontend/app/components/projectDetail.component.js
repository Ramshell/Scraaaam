import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ProjectDetailTemplate from '../templates/projectDetail.html';
import ProjectService from "../services/project.service";

@Component({
  selector: 'projectDetail',
  inputs: [ 'project' ],
  template: ProjectDetailTemplate
})

export default class ProjectDetailComponent {
  constructor(route, projectService){
    this.projectService = projectService
    this.route = route
  }

  ngOnInit() {
    this.project = {}
    this.route.params.subscribe(params => {
      this.project = this.projectService.getProject(params.id)
    })
  }
}

ProjectDetailComponent.parameters = [
  ActivatedRoute, ProjectService
]
