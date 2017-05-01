import {Component} from '@angular/core';
import TaskFrameTemplate from '../templates/taskFrame.html';

@Component({
    selector: 'taskFrame',
    inputs: ['data', 'activeProject'],
    template: TaskFrameTemplate
})

export default class TaskFrameComponent {
}
