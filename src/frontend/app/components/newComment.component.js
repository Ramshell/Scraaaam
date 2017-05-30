import { Component } from '@angular/core';
import ProjectService from '../services/project.service';

@Component({
  selector: 'newComment',
  inputs: [ 'task' ],
  template: NewTaskTemplate
})
export default class NewCommentComponent {
  constructor(projectService) {
    this.setNewComment()
    this.projectService = projectService
  }

  setNewComment() {
    this.data = { content: '' }
  }

  createComment() {
    this.projectService.createComment(this.task, this.data)
    this.setNewComment()
  }
}

NewCommentComponent.parameters = [
  [ProjectService]
]
