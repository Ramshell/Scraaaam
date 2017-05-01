import {Injectable} from '@angular/core'

@Injectable()
export default class ActiveViewService {

    constructor() {
        this.activeTask = {}
        this.activeProject = {}
        this.taskHistory = []
    }

    load(taskHistory) {
        this.taskHistory = taskHistory
        this.activeProject = this.taskHistory[this.taskHistory.length - 1]
        this.activeTask = this.taskHistory[0]
    }

    switchInto(newActiveTask) {
        this.activeTask = newActiveTask
        this.taskHistory.unshift(this.activeTask)
    }

    switchBack(taskIndex) {
        this.taskHistory.splice(0, taskIndex)
        this.activeTask = this.taskHistory[0]
    }
}