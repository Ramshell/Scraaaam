import { Component } from '@angular/core';
import NewCommentTemplate from '../templates/newComment.html';
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

  create_comment() {
    this.projectService.create_comment(this.task, this.data)
    this.setNewComment()
  }
}

NewCommentComponent.parameters = [
  [ProjectService]
]
