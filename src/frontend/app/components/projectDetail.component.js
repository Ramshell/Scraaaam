import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ProjectDetailTemplate from '../templates/projectDetail.html';
import ProjectService from "../services/project.service";
import MilestoneService from "../services/milestone/milestone.service";

@Component({
  selector: 'projectDetail',
  inputs: [ 'data' ],
  template: ProjectDetailTemplate,
  providers: [ MilestoneService ]
})

export default class ProjectDetailComponent {
  constructor(route, projectService, milestoneService){
    this.projectService = projectService
    this.milestoneService = milestoneService
    this.route = route
  }

  ngOnInit() {
    this.data = {}
    this.route.params.subscribe(params => {
      this.projectService.getProject(params.id)
        .then(data => this.data = data)
        .catch(e => console.log(e))
    })
  }
}

ProjectDetailComponent.parameters = [
  ActivatedRoute, ProjectService, MilestoneService
]
