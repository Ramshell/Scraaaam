import { Component } from '@angular/core';

@Component({
  selector: 'project',
  inputs: [ 'project' ],
  template: `<div [ngSwitch]="project">
              <div *ngSwitchCase="undefined" class="panel panel-default">
                <div class="panel-heading">{{project.title}}</div>
                <div class="panel-body">
                  {{project.description}}
                  </div>
                </div>
                <b *ngSwitchDefault>Please select a project</b>
              </div>`
})
export default class ProjectComponent {
  constructor(){
    this.project = undefined
  }
}
