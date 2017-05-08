import { Component } from '@angular/core';
import TaskTemplate from '../templates/task.html';
import ProjectService from "../services/project.service";

@Component({
  selector: 'task',
  inputs: [ 'data', 'parent' ],
  template: TaskTemplate
})

export default class TaskComponent {
  constructor(projectService) {
      this.projectService = projectService
  }

  deleteContents(data, parent){
    this.projectService.deleteTask(data.project, data._id)
    parent.tasks.splice(parent.tasks.indexOf(data), 1)
  }
}

TaskComponent.parameters = [
    [ProjectService]
]
