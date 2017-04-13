import { Component } from '@angular/core';
import TaskTemplate from '../templates/project.html';

@Component({
  selector: 'task',
  inputs: [ 'project' ],
  template: TaskTemplate
})

export default class TaskComponent {
}
