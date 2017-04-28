import { Component } from '@angular/core';
import NewTaskTemplate from '../templates/newTask.html';
import ProjectService from '../services/project.service';

@Component({
  selector: 'newTask',
  inputs: [ 'task', 'taskName' ],
  template: NewTaskTemplate
})
export default class NewTaskComponent {
  constructor(projectService) {
    this.setNewTask()
    this.projectService = projectService
  }

  setNewTask() {
    console.log("being called")
    this.data = { title: '', description: '', tasks: [], category: 'Milestone' }
  }

  create_task() {
    this.projectService.create_task(this.task, this.data)
    this.setNewTask()
  }
}

NewTaskComponent.parameters = [
  [ProjectService]
]
