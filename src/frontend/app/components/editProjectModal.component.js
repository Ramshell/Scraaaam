import {Component} from '@angular/core';
import EditProjectModalTemplate from '../templates/editProjectModal.html';
import ProjectService from '../services/project.service';

@Component({
    selector: 'editProjectModal',
    inputs: ['data'],
    template: EditProjectModalTemplate
})
export default class EditProjectModalComponent {
    constructor(projectService) {
        this.projectService = projectService
    }

    submitProject() {
        this.projectService.submitProject(this.data)
    }
}

EditProjectModalComponent.parameters = [
    [ProjectService]
]
