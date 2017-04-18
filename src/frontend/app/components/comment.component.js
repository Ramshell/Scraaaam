import { Component } from '@angular/core';
import CommentTemplate from '../templates/comment.html';

@Component({
  selector: 'comment',
  inputs: [ 'data' ],
  template: CommentTemplate
})

export default class TaskComponent {
}
