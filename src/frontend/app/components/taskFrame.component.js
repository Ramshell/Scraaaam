import {Component} from '@angular/core';
import TaskFrameTemplate from '../templates/taskFrame.html';
import ProjectService from "../services/project.service";
import ActiveViewService from "../services/activeView.service";
import {Router} from "@angular/router";

@Component({
    selector: 'taskFrame',
    inputs: ['data', 'index'],
    template: TaskFrameTemplate
})

export default class TaskFrameComponent {
    constructor(projectService, activeViewService, router) {
        this.projectService = projectService
        this.activeViewService = activeViewService
        this.router = router
    }

    deleteContents() {
        if (!this.data.parent)
            this.projectService.deleteProject(this.activeViewService.activeProject._id)
                .then(_ => this.router.navigateByUrl('/'))
        else
            this.projectService.deleteTask(this.activeViewService.activeProject._id, this.data._id)
                .then(parent => {
                        this.activeViewService.switchBack(this.index + 1)
                        this.activeViewService.updateActiveTask(parent)
                    }
                )
    }
}

TaskFrameComponent.parameters = [
    ProjectService, ActiveViewService, Router
]
