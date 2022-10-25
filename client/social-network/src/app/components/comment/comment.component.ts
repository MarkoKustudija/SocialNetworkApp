import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;

  constructor() { 
    this.comment = {
      id: -1,
      user: null,
      post: null,
      time: new Date(),
      content: ''
      }
  }

  ngOnInit(): void {
  }

}
