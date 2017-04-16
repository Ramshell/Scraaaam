import { Component } from '@angular/core';
import TaskListTemplate from '../templates/taskList.html';
import ProjectService from '../services/project.service';


@Component({
  selector: 'taskList',
  inputs: ['task' ],
  template: TaskListTemplate
})
export default class TaskListComponent {
  constructor(projectService) {
    this.projectService = projectService;
  }
}

TaskListComponent.parameters = [
  [ProjectService]
]
