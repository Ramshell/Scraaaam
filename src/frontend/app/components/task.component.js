import { Component } from '@angular/core';
import TaskTemplate from '../templates/project.html';

@Component({
  selector: 'task',
  inputs: [ 'task' ],
  template: TaskTemplate
})

export default class TaskComponent {
}
