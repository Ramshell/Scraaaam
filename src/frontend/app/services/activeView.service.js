import {Injectable} from '@angular/core'

@Injectable()
export default class ActiveViewService {

    constructor() {
        this.activeTask = {}
        this.activeProject = {}
        this.taskHistory = []
        this.editedTask = {}
        this.editedParent = {}
    }

    load(taskHistory) {
        this.taskHistory = taskHistory
        this.activeProject = this.taskHistory[this.taskHistory.length - 1]
        this.activeTask = this.taskHistory[0]
    }

    updateActiveTask(updatedTask) {
        this.activeTask = updatedTask
        this.taskHistory[0] = this.activeTask
    }

    switchInto(newActiveTask) {
        this.activeTask = newActiveTask
        this.taskHistory.unshift(this.activeTask)
    }

    switchBack(taskIndex) {
        this.taskHistory.splice(0, taskIndex)
        this.activeTask = this.taskHistory[0]
    }

    edit(parentTask, task) {
        this.editedTask = task
        this.editedParent = parentTask
    }
}
