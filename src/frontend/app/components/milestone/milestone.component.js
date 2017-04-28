import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MilestoneTemplate from '../../templates/milestone/milestone.html';

@Component({
  selector: 'milestone',
  inputs: [ 'data' ],
  template: MilestoneTemplate
})

export default class MilestoneComponent {
  constructor(route){
    this.route = route
  }

  get epics() {
    return this.data.tasks.filter((x) => x.category == 'Epic')
  }

  get tasks() {
    return this.data.tasks.filter((x) => x.category == 'Normal' || x.category == 'Spike')
  }
}

MilestoneComponent.parameters = [
  [ActivatedRoute]
]
