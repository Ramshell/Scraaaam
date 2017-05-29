import {Component} from '@angular/core';
import TaskListTemplate from '../templates/taskList.html';
import ProjectService from '../services/project.service';
import ActiveViewService from '../services/activeView.service'


@Component({
    selector: 'taskList',
    inputs: ['task'],
    template: TaskListTemplate
})
export default class TaskListComponent {
    constructor(projectService, activeViewService) {
        this.projectService = projectService;
        this.activeViewService = activeViewService;
    }

    onScroll() {
        console.log('last')
    }

    change_task(item) {
        this.projectService.getTask(this.activeViewService.activeProject._id, item._id)
            .then(task => {
                this.task = task
                this.activeViewService.switchInto(task)
            })
    }
}

TaskListComponent.parameters = [
    ProjectService, ActiveViewService
]
