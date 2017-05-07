import { Component } from '@angular/core';
import EditProjectModalTemplate from '../templates/editProjectModal.html';
import ProjectService from '../services/project.service';

@Component({
  selector: 'editProjectModal',
  template: EditProjectModalTemplate
})
export default class EditProjectModalComponent {
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

EditProjectModalComponent.parameters = [
  [ProjectService]
]
