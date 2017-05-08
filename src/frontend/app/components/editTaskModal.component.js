import {Component} from '@angular/core';
import EditTaskModalTemplate from '../templates/editTaskModal.html';
import ProjectService from '../services/project.service';

@Component({
    selector: 'editTaskModal',
    inputs: ['task', 'data'],
    template: EditTaskModalTemplate
})
export default class EditTaskModalComponent {
    constructor(projectService) {
        this.projectService = projectService
    }

    submitTask() {
        if (!this.data.category)
            this.data.category = this.task.allowedCategories[0]
        this.projectService.submitTask(this.task, this.data)
    }
}

EditTaskModalComponent.parameters = [
    ProjectService
]
