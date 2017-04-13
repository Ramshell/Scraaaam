import { Component } from '@angular/core';
import TaskListTemplate from '../templates/taskList.html';
import ProjectService from '../services/project.service';


@Component({
  selector: 'taskList',
  inputs: ['tasks'],
  template: TaskListTemplate
})
export default class TaskListComponent {
  constructor(projectService) {
    this.tasks = []
    this.projectService = projectService;
  }
}

TaskListComponent.parameters = [
  [ProjectService]
]
