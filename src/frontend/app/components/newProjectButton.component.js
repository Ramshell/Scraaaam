import {Component} from '@angular/core';
import NewProjectButtonTemplate from '../templates/newProjectButton.html';
import ProjectService from '../services/project.service';

@Component({
    selector: 'newProjectButton',
    template: NewProjectButtonTemplate
})
export default class NewProjectButtonComponent {
    constructor(projectService) {
        this.projectService = projectService
    }

    clicked() {
        this.projectService.editedProject = this.projectService.newProjectTemplate()
        return true
    }
}

NewProjectButtonComponent.parameters = [
    ProjectService
]
