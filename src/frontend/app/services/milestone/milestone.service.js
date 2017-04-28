import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class MilestoneService {

  constructor(http) {
    this.http = http
    this.currentMilestone = { _id:"invalid", title: 'Select a milestone!' }
  }

  create_epic(epic){
    this.http.post(`/projects/${this.currentMilestone.project._id}/tasks/${this.currentMilestone._id}`, JSON.stringify(task), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(theTask => this.currentMilestone.tasks.push(theTask.json()))
            .catch(err => console.log(err))
  }
}

MilestoneService.parameters = [
  Http
]
