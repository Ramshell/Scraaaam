import { Component } from '@angular/core';
import TaskListTemplate from '../templates/taskList.html';
import ProjectService from '../services/project.service';
import MilestoneService from '../services/milestone/milestone.service';


@Component({
  selector: 'taskList',
  inputs: ['task', 'taskName', 'partial' ],
  template: TaskListTemplate
})
export default class TaskListComponent {
  constructor(projectService, milestoneService) {
    this.projectService = projectService;
    this.milestoneService = milestoneService;
  }

  onScroll(){
    console.log('last')
  }

  change_task(item){
    this.milestoneService.getMilestone(item.project._id || item.project, item._id)
  }
}

TaskListComponent.parameters = [
  ProjectService, MilestoneService
]
