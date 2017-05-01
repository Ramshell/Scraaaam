import {Injectable} from '@angular/core';
import {Http} from '@angular/http'

@Injectable()
export default class ProjectService {

    constructor(http) {
        this.http = http
        this._filter = ''
        this._allProjects = []
        this.projects = []
        this.http.get("/projects").toPromise()
            .then(response => {
                this._allProjects.push(...response.json())
                this.updateProjects()
            })
            .catch(err => console.log(err))
    }

    get filter() {
        return this._filter
    }

    set filter(value) {
        this._filter = value
        this.updateProjects()
    }

    updateProjects() {
        this.projects = this._allProjects.filter(project => project.title.includes(this.filter))
    }

    getProject(id) {
        return this.http.get(`/projects/${id}`).toPromise()
            .then(response => response.json())
    }

    create(project) {
        this.http.post("/projects", JSON.stringify(project), {headers: {'Content-Type': 'application/json'}})
            .toPromise()
            .then(theProject => {
                this._allProjects.push(theProject.json());
                this.updateProjects()
            })
            .catch(err => console.log(err))
    }

    create_task(parentTask, task) {
        console.log(parentTask)
        const projId = parentTask.contributors ? parentTask._id : parentTask.project._id
        this.http.post(`/projects/${projId}/tasks/${parentTask._id}`, JSON.stringify(task), {headers: {'Content-Type': 'application/json'}})
            .toPromise()
            .then(theTask => parentTask.tasks.push(theTask.json()))
            .catch(err => console.log(err))
    }

    create_comment(task, comment) {
        this.http.post(`/projects/${task.project._id}/tasks/${task._id}/comments`, JSON.stringify(comment), {headers: {'Content-Type': 'application/json'}})
            .toPromise()
            .then(theComment => task.comments.push(theComment.json()))
            .catch(err => console.log(err))
    }

    getTask(id, taskId) {
        return this.http.get(`/projects/${id}/tasks/${taskId}`).toPromise()
            .then(response => response.json())
    }

    getTaskHistory(id, taskId) {
        return this.http.get(`/projects/${id}/tasks/${taskId}/history`).toPromise()
            .then(response => response.json())
    }
}

ProjectService.parameters = [
    Http
]
