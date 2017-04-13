import { Component } from '@angular/core';
import NewTaskTemplate from '../templates/newTask.html';
import ProjectService from '../services/project.service';

@Component({
  selector: 'newTask',
  inputs: [ 'task' ],
  template: NewTaskTemplate
})
export default class NewTaskComponent {
  constructor(projectService) {
    this.setNewTask()
    this.projectService = projectService
  }

  setNewTask() {
    this.data = { title: 'Milestone', description: '', tasks: [] }
  }

  create_task() {
    this.projectService.create_task(this.task, this.data)
    this.setNewTask()
  }
}

NewTaskComponent.parameters = [
  [ProjectService]
]
