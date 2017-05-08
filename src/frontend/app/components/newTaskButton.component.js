import {Component} from '@angular/core';
import NewTaskButtonTemplate from '../templates/newTaskButton.html';
import ProjectService from '../services/project.service';
import ActiveViewService from '../services/activeView.service';

@Component({
    selector: 'newTaskButton',
    template: NewTaskButtonTemplate
})
export default class NewTaskButtonComponent {
    constructor(projectService, activeViewService) {
        this.projectService = projectService
        this.activeViewService = activeViewService
    }

    clicked() {
        this.activeViewService.edit(this.activeViewService.activeTask, this.projectService.newTaskTemplate())
        return true
    }
}

NewTaskButtonComponent.parameters = [
    ProjectService, ActiveViewService
]
