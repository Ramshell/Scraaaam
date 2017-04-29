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
}

MilestoneComponent.parameters = [
  [ActivatedRoute]
]
