import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import TaskDetailTemplate from '../templates/taskDetail.html';
import ProjectService from "../services/project.service";

@Component({
  selector: 'taskDetail',
  inputs: [ 'data' ],
  template: TaskDetailTemplate
})

export default class TaskDetailComponent {
  constructor(route, projectService){
    this.projectService = projectService
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
  ActivatedRoute, ProjectService
]
