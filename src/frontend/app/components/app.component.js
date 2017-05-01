import {Component} from '@angular/core'
import ScraaaamTemplate from '../templates/app.html'
import ProjectService from '../services/project.service'

@Component({
    selector: 'app-view',
    template: ScraaaamTemplate,
    providers: [ProjectService]
})
export default class AppComponent {
    constructor(projectService) {
        this.projectService = projectService
    }
}

AppComponent.parameters = [
    [ProjectService]
]
