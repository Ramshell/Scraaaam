import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import TaskDetailTemplate from '../templates/taskDetail.html';
import ProjectService from "../services/project.service";
import MilestoneService from "../services/milestone/milestone.service";

@Component({
  selector: 'taskDetail',
  inputs: [ 'data' ],
  template: TaskDetailTemplate,
  providers: [ MilestoneService ]
})

export default class TaskDetailComponent {
  constructor(route, projectService, milestoneService){
    this.projectService = projectService
    this.milestoneService = milestoneService
    this.route = route
  }

  ngOnInit() {
    this.data = {}
    this.route.params.subscribe(params => {
      this.projectService.getTask(params.id, params.taskId)
        .then(data => this.data = data)
        .catch(e => console.log(e))

    })
  }
}

TaskDetailComponent.parameters = [
  ActivatedRoute, ProjectService, MilestoneService
]
