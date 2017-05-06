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

    createTask(parentTask, task) {
        const projId = this.getProjectIdFrom(parentTask)
        this.http.post(`/projects/${projId}/tasks/${parentTask._id}`, JSON.stringify(task), {headers: {'Content-Type': 'application/json'}})
            .toPromise()
            .then(theTask => parentTask.tasks.push(theTask.json()))
            .catch(err => console.log(err))
    }

    updateTask(parentTask, task) {
        const projId = this.getProjectIdFrom(parentTask)
        this.http.put(`/projects/${projId}/tasks/${parentTask._id}`, JSON.stringify(task), {headers: {'Content-Type': 'application/json'}})
            .toPromise()
            .then(_ => {
                parentTask.tasks = parentTask.tasks.map(t => (t._id === task._id) ? task : t)
            })
            .catch(err => console.log(err))
    }

    createComment(task, comment) {
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

    deleteTask(id, taskId) {
        return this.http.delete(`/projects/${id}/tasks/${taskId}`).toPromise()
            .then(parent => parent.json())
    }

    deleteProject(id) {
        return this.http.delete(`/projects/${id}`).toPromise()
            .then(projects => {
                this._allProjects = projects.json()
                this.updateProjects()
                return Promise.resolve(projects)
            })
    }

    newTaskTemplate() {
        return {title: '', description: ''}
    }

    submitTask(parentTask, submitedTask) {
        if (!submitedTask._id) {
            this.createTask(parentTask, submitedTask)
        } else {
            this.updateTask(parentTask, submitedTask)
        }
    }

    getProjectIdFrom(task) {
        return task.contributors ? task._id : task.project._id
    }
}

ProjectService.parameters = [
    Http
]
