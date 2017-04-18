import { Component } from '@angular/core';
import CommentListTemplate from '../templates/commentList.html';
import ProjectService from '../services/project.service';


@Component({
  selector: 'commentList',
  inputs: [ 'task' ],
  template: CommentListTemplate
})
export default class CommentListComponent {
  constructor(projectService) {
    this.comment = {content: ''}
    this.projectService = projectService;
  }

  create_comment() {
    this.projectService.create_comment(this.task, this.comment)
    this.comment = {content: ''}
  }
}

CommentListComponent.parameters = [
  [ProjectService]
]
