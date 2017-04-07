import { Component } from '@angular/core';
import ProjectTemplate from '../templates/project.html';

@Component({
  selector: 'project',
  inputs: [ 'project' ],
  template: ProjectTemplate
})

export default class ProjectComponent {
}
