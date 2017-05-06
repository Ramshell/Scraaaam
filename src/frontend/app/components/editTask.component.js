import {Component} from '@angular/core';
import EditTaskTemplate from '../templates/editTask.html';
import ProjectService from '../services/project.service';

@Component({
    selector: 'editTask',
    inputs: ['task', 'data'],
    template: EditTaskTemplate
})
export default class EditTaskComponent {
    constructor(projectService) {
        this.projectService = projectService
    }

    ngOnInit() {
        if(!this.data) {
            this.data = this.projectService.newTaskTemplate()
        }
    }

    submitTask() {
        if (!this.data.category)
            this.data.category = this.task.allowedCategories[0]
        this.projectService.submitTask(this.task, this.data)
    }
}

EditTaskComponent.parameters = [
    ProjectService
]
