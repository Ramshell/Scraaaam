import { Component } from '@angular/core';
import ProjectListTemplate from '../templates/projectList.html';
import ProjectService from '../services/project.service';


@Component({
  selector: 'projectList',
  template: ProjectListTemplate
})
export default class ProjectListComponent {
  constructor(projectService) {
    this.projects = projectService.projects;
  }
}

ProjectListComponent.parameters = [
  [ProjectService]
]
