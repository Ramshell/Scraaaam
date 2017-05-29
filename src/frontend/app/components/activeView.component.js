import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import ProjectService from "../services/project.service";
import ActiveViewTemplate from '../templates/activeView.html';
import ActiveViewService from "../services/activeView.service";

@Component({
    selector: 'activeView',
    template: ActiveViewTemplate,
    providers: [ActiveViewService]
})
export default class ActiveViewComponent {
    constructor(route, projectService, activeViewService) {
        this.projectService = projectService
        this.activeViewService = activeViewService
        this.route = route
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.projectService.getTaskHistory(params.id, params.taskId || params.id)
                .then(taskHistory => this.activeViewService.load(taskHistory))
                .catch(e => console.log(e))
        })
    }
}

ActiveViewComponent.parameters = [
    ActivatedRoute, ProjectService, ActiveViewService
]
