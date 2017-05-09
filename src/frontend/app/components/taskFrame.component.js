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
        this.categoryDetailText = ''
        this.hideComments = true
    }

    ngOnInit() {
        this.data.frame = this
        this.updateCategoryDetail()
    }

    updateCategoryDetail() {
        const detail = this.data.tasks.reduce((acc, task) => {
            acc[task.category] = ++acc[task.category] || 1
            return acc
        }, {})
        this.categoryDetailText = Object.keys(detail).map(key => `${detail[key]} ${key}`).join(', ')
    }

    deleteContents() {
        if (this.data.project) {
            this.projectService.deleteTask(this.activeViewService.activeProject._id, this.data._id)
                .then(parent => {
                        this.activeViewService.switchBack(this.index + 1)
                        this.activeViewService.updateActiveTask(parent)
                        this.activeViewService.activeTask.frame.updateCategoryDetail()
                    }
                )
        } else {
            this.projectService.deleteProject(this.activeViewService.activeProject._id)
                .then(_ => this.router.navigateByUrl('/'))
        }
    }

    editContents() {
        if (this.data.project) {
            const parentTask = this.activeViewService.taskHistory[this.index + 1]
            this.activeViewService.edit(parentTask, this.data)
        } else {
            this.projectService.editedProject = this.data
        }
        return true
    }

    toggleComments(event, data) {
        event.stopPropagation()
        $(`#${data._id}`).collapse("toggle")
        this.hideComments = !this.hideComments
    }
}

TaskFrameComponent.parameters = [
    ProjectService, ActiveViewService, Router
]
