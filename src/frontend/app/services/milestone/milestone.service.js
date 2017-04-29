import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class MilestoneService {

  constructor(http) {
    this.http = http
    this.currentMilestone = { _id:"invalid", title: 'Select a milestone!' }
  }

  getMilestone(project_id, id){
    this.http.get(`/projects/${project_id}/tasks/${id}`)
            .toPromise()
            .then(theTask => {
              console.log(theTask)
              this.currentMilestone = theTask.json()
              this.currentMilestone.epics = theTask.json().tasks.filter((x) => x.category == 'Epic').length
            })
            .catch(err => console.log(err))
  }

  create_epic(epic){
    this.http.post(`/projects/${this.currentMilestone.project._id}/tasks/${this.currentMilestone._id}`, JSON.stringify(task), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(theTask => {
              this.currentMilestone.tasks.push(theTask.json());
              this.epics = (this.epic || 0) + 1
            })
            .catch(err => console.log(err))
  }
}

MilestoneService.parameters = [
  Http
]
