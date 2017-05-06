import { Component } from '@angular/core';
import NewProjectTemplate from '../templates/newProject.html';
import ProjectService from '../services/project.service';

@Component({
  selector: 'newProject',
  template: NewProjectTemplate
})
export default class NewProjectComponent {
  constructor(projectService) {
    this.setNewProject()
    this.projectService = projectService
  }

  setNewProject() {
    this.data = { title: '', description: '', contributors: [], tasks: [] }
  }

  createProject() {
    this.projectService.create(this.data)
    this.setNewProject()
  }
}

NewProjectComponent.parameters = [
  [ProjectService]
]
